'use client';

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { StrictModeDroppable } from './Dropable';

function Board() {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
        (state) => [
            state.board,
            state.getBoard,
            state.setBoardState,
            state.updateTodoInDB,
        ]
    );

    useEffect(() => {
        // Get Boards
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, type, source } = result;

        // Check if User drag item outside the board
        if (!destination) return;

        // handle column drag
        if (type === 'column') {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const modifyColumns = new Map(entries);
            setBoardState({ ...board, columns: modifyColumns });
        }

        //Handle Card Drag
        const colums = Array.from(board.columns);
        const startColIndex = colums[Number(source.droppableId)];
        const endColIndex = colums[Number(destination.droppableId)];

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        };

        const endCol: Column = {
            id: endColIndex[0],
            todos: endColIndex[1].todos,
        };

        if (!startCol || !endCol) return;
        if (source.index === destination.index && startCol === endCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === endCol.id) {
            //same column drag
            newTodos.splice(destination.index, 0, todoMoved);
            const newCOl = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCOl);

            setBoardState({ ...board, columns: newColumns });
        } else {
            // dragging to another column
            const endTodos = Array.from(endCol.todos);
            endTodos.splice(destination.index, 0, todoMoved);
            const newCOl = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCOl);
            newColumns.set(endCol.id, {
                id: endCol.id,
                todos: endTodos,
            });

            updateTodoInDB(todoMoved, endCol.id);
            setBoardState({ ...board, columns: newColumns });
        }
    };

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
