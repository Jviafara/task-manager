'use client';

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
    todo,
    id,
    index,
    innerRef,
    dragHandleProps,
    draggableProps,
}: Props) {
    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] = useState<string | null>('');

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) setImageUrl(url.toString());
            };
            fetchImage();
        }
    }, []);

    return (
        <div
            {...dragHandleProps}
            {...draggableProps}
            ref={innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md">
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button
                    type="button"
                    onClick={() => deleteTask(index, todo, id)}>
                    <XCircleIcon className="ml-5 h-8 w-8 text-red-500 hover:text-red-600" />
                </button>
            </div>

            {/* ADD IMAGE URL */}
            {imageUrl && (
                <div className="h-full w-full rounded-b-md ">
                    <Image
                        src={imageUrl}
                        alt="Task Image"
                        width={400}
                        height={400}
                        className="w-full object-contain rounded-b-md"
                    />
                </div>
            )}
        </div>
    );
}

export default TodoCard;
