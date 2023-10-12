'use client';

import { XCircleIcon } from '@heroicons/react/20/solid';
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
    return (
        <div
            {...dragHandleProps}
            {...draggableProps}
            ref={innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md">
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button>
                    <XCircleIcon className="ml-5 h-8 w-8 text-red-500 hover:text-red-600" />
                </button>
            </div>

            {/* ADD IMAGE URL */}
        </div>
    );
}

export default TodoCard;
