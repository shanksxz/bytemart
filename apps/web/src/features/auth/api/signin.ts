import { api } from "@/utils/api-client";
import type { MutationConfig } from "@/utils/react-query";
import type { LoginInput } from "@bytemart/types";
import { useMutation } from "@tanstack/react-query";

export const signin = ({ user }: { user: LoginInput }) => {
	return api.post("auth/signin", user);
};

export const useSignin = ({
	mutationConfig,
}: { mutationConfig?: MutationConfig<typeof signin> }) => {
	return useMutation({
		mutationFn: signin,
		...mutationConfig,
	});
};
