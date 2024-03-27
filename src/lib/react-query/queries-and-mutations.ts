import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  useInfiniteQuery 
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../api";
import { NewUser, SignIn } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user)
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: SignIn) => signInAccount(user)
  })
}