import { categories, db, eq } from "@bytemart/database";
import { CategorySchema } from "@bytemart/types";
import type { Request, Response } from "express";
import { handleError } from "../utils";
import ApiError from "../utils/api-error";

interface DatabaseCategory {
    id: string;
    name: string;
    parent_id: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    products: any[];
}

interface CategoryTreeNode {
    id: string;
    name: string;
    parentId: string | null;
    slug: string;
    productCount: number;
    createdAt: Date;
    updatedAt: Date;
    children: CategoryTreeNode[];
}

export const createCategory = async (req: Request, res: Response) => {
	try {
		if (req.user.role !== "admin") {
			throw ApiError.forbidden("Only admins can create categories");
		}

        console.log("jnjrnj",req.body);
		const validatedData = CategorySchema.parse(req.body);

		const category = await db.insert(categories).values({
			name: validatedData.name,
			parent_id: validatedData.parentId || null,
		});

		res.status(201).json({
			success: true,
			data: category,
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const getParentCategories = async (req: Request, res: Response) => {
    try {
        const parentCategories = await db.query.categories.findMany({
            where: eq(categories.parent_id, ""),
        });

        res.json({
            success: true,
            data: parentCategories,
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await db.query.categories.findMany({
			with: {
				products: true,
			},
		});

		const buildCategoryTree = (categories: DatabaseCategory[], parentId: string | null = null): CategoryTreeNode[] => {
			return categories
				.filter(cat => {
					if (parentId === null) {
						return !cat.parent_id || cat.parent_id === '';
					}
					return cat.parent_id === parentId;
				})
				.map(cat => ({
					id: cat.id,
					name: cat.name,
					parentId: cat.parent_id,
					slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
					productCount: cat.products.length,
					createdAt: cat.created_at ?? new Date(),
					updatedAt: cat.updated_at ?? new Date(),
					children: buildCategoryTree(categories, cat.id)
				}));
		};

		const parentCategories = allCategories.filter(cat => !cat.parent_id || cat.parent_id === '');
		const categoryTree = buildCategoryTree(allCategories);

		res.json({
			success: true,
			data: {
				allCategories: categoryTree,
				parentCategories: parentCategories
			},
		});
	} catch (error) {
		handleError(error, res);
	}
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    if (req.user.role !== "admin") {
      throw ApiError.forbidden("Only admins can update categories");
    }

    const validatedData = CategorySchema.partial().parse(req.body);

    await db
      .update(categories)
      .set({
        name: validatedData.name,
        parent_id: validatedData.parentId || null,
      })
      .where(eq(categories.id, req.params.id as string));

    res.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (req.user.role !== "admin") {
      throw ApiError.forbidden("Only admins can delete categories");
    }

    const children = await db.query.categories.findMany({
      where: eq(categories.parent_id, req.params.id as string),
    });

    if (children.length > 0) {
      throw ApiError.badRequest("Cannot delete category with subcategories");
    }

    await db.delete(categories).where(eq(categories.id, req.params.id as string));

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
}; 