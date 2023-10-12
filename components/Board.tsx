'use client';

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { StrictModeDroppable } from './Dropable';

function Board() {
    const [board, getBoard] = useBoardStore((state) => [
        state.board,
        state.getBoard,
    ]);

    useEffect(() => {
        // Get Boards
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result: DropResult) => {};

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <StrictModeDroppable
                droppableId="board"
                direction="horizontal"
                type="column">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
                        {/* endering all columns */}
                        {Array.from(board.columns.entries()).map(
                            ([id, column], index) => (
                                <Column
                                    key={id}
                                    id={id}
                                    todos={column.todos}
                                    index={index}
                                />
                            )
                        )}
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}

export default Board;
