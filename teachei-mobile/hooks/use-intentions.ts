import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { intentionsService } from "@/services/intentions";
import { IntentionFilters, CreateAnuncioRequest } from "@/types";

export function useIntentions(filters?: IntentionFilters) {
  return useInfiniteQuery({
    queryKey: ["intentions", filters],
    queryFn: ({ pageParam = 0 }) => intentionsService.getIntentions(pageParam, 10, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages - 1) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}

export function useIntentionDetails(id: string) {
  return useQuery({
    queryKey: ["intentions", id],
    queryFn: () => intentionsService.getIntentionById(id),
    enabled: !!id,
  });
}

export function useMyIntentions() {
  return useInfiniteQuery({
    queryKey: ["intentions", "mine"],
    queryFn: ({ pageParam = 0 }) => intentionsService.getMyIntentions(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages - 1) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}

export function useCreateIntention() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnuncioRequest) => intentionsService.createIntention(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}

export function useUpdateIntention() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAnuncioRequest> }) =>
      intentionsService.updateIntention(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}

export function useMarkIntentionComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => intentionsService.markAsCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}

export function useDeleteIntention() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => intentionsService.deleteIntention(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}



