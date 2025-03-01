import { api } from "@/utils/api-client";
import type { SignupInput } from "@bytemart/types";
import type { MutationConfig } from "@/utils/react-query";
import { useMutation } from "@tanstack/react-query";

export const signup = ({ user }: { user: SignupInput }) => {
	return api.post("auth/signup", user);
};

export const useSignup = ({
	mutationConfig,
}: { mutationConfig?: MutationConfig<typeof signup> }) => {
	return useMutation({
		mutationFn: signup,
		...mutationConfig,
	});
};
