/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IReactQuery } from '../interfaces';

const useCustomMutation = <T,>({
    key,
    queryGet,
    mutationCreate,
}: IReactQuery) => {
    const queryClient = useQueryClient();
    const [mutationError, setMutationError] = useState<Error | null>(null);

    const { data, error, isLoading } = useQuery<T[], Error>({
        queryKey: [key],
        queryFn: () => queryGet(),
        staleTime: 10 * 1000,
    });

    const addItem = useMutation<T, Error, T>({
        mutationFn: (payload: T) => mutationCreate(payload),
        onSuccess: (newItem) => {
            queryClient.setQueryData<T[]>([key], (collection) => [
                newItem,
                ...(collection || []),
            ]);
        },
        onError: (err: Error) => {
            setMutationError(err);
        },
    });

    const errors: Error | null = error || mutationError;

    return { data, errors, isLoading, addItem };
};

export default useCustomMutation;
