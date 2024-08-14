'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import Form from './form';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon, Button, Title, Text } from 'rizzui';
import DeletePopover from '../shared/delete-popover';
import { TrashIcon, PencilSquareIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Experience {
  id: number;
  company?: string;
  role?: string;
  duration?: string;
  institution?: string;
  degree?: string;
  year?: string;
  skillName?: string;
}

interface ProfileSectionProps {
  initialValues: Experience[];
  title: string;
  // other props...
}

const ProfileSection = ({ initialValues = [], title = "" }: ProfileSectionProps) => {
  const [data, setData] = useState<Experience[]>(initialValues);
  const { openModal } = useModal();

  // Handle deleting an item
  const handleDelete = useCallback(async (section: string, id: number) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, id }),
      });

      if (res.ok) {
        setData(prevExperience => prevExperience.filter(exp => exp.id !== id));
        toast.success('Item deleted successfully!');
      } else {
        const errorMessage = await res.text();
        console.error('Failed to delete experience:', errorMessage);
        toast.error(`Failed to delete item: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while deleting the item.');
    }
  }, []);

  // Handle adding a new item
  const handleAdd = useCallback(async (newData: Partial<Experience>) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [title.toLowerCase()]: [...data, { ...newData, id: Date.now() }],
        }),
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setData(updatedProfile[title.toLowerCase()]);
      } else {
        const errorMessage = await res.text();
        console.error('Failed to add data:', errorMessage);
        toast.error(`Failed to add item: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while adding the item.');
    }
  }, [data, title]);

  // Handle editing an item
  const handleEdit = useCallback(async (id: number, updatedData: Partial<Experience>) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [title.toLowerCase()]: data.map(exp => exp.id === id ? { ...exp, ...updatedData } : exp),
        }),
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setData(updatedProfile[title.toLowerCase()]);
      } else {
        const errorMessage = await res.text();
        console.error('Failed to update experience:', errorMessage);
        toast.error(`Failed to update item: ${errorMessage}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while updating the item.');
    }
  }, [data, title]);

  // Handle drag end event
  const handleOnDragEnd = useCallback((result: { source: any; destination: any; }) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    const updatedItems = Array.from(data);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    setData(updatedItems);
  }, [data]);

  // Move item up
  const moveItemUp = useCallback((index: number) => {
    if (index === 0) return; // Already at the top

    const updatedItems = Array.from(data);
    const [movedItem] = updatedItems.splice(index, 1);
    updatedItems.splice(index - 1, 0, movedItem);

    setData(updatedItems);
    toast.success('Item moved up!');
  }, [data]);

  // Move item down
  const moveItemDown = useCallback((index: number) => {
    if (index === data.length - 1) return; // Already at the bottom

    const updatedItems = Array.from(data);
    const [movedItem] = updatedItems.splice(index, 1);
    updatedItems.splice(index + 1, 0, movedItem);

    setData(updatedItems);
    toast.success('Item moved down!');
  }, [data]);

  // Render content with drag-and-drop
  const renderedContent = useMemo(() => (
    <Droppable droppableId="droppable">
      {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; droppableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; placeholder: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {data.map((exp, index) => (
            <Draggable key={exp.id} draggableId={exp.id.toString()} index={index}>
              {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; draggableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; }) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="my-4 flex justify-between"
                >
                  <div>
                    <Title as="h6">
                      {exp.company || exp.institution}
                    </Title>
                    <Text>
                      {exp.role || exp.degree} {exp.duration || exp.year || ''}
                    </Text>
                    <p>{exp.skillName}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ActionIcon
                      variant="text"
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                    >
                      <ChevronUpIcon color="blue" className="w-5 h-5" />
                    </ActionIcon>
                    <ActionIcon
                      variant="text"
                      onClick={() => moveItemDown(index)}
                      disabled={index === data.length - 1}
                    >
                      <ChevronDownIcon color="blue" className="w-5 h-5" />
                    </ActionIcon>

                

                    <ActionIcon
                      variant="text"
                      onClick={() =>
                        openModal({
                          view: <Form title={title} initialValues={exp} onSubmit={(updatedData) => handleEdit(exp.id, updatedData)} />,
                          customSize: '720px',
                        })
                      }
                    >
                      <PencilSquareIcon color="red" className="w-5 h-5" />
                    </ActionIcon>


                    <DeletePopover
          title={`Delete Member`}
          description={`Are you sure you want to delete ?`}
          onDelete={() => handleDelete(title?.toLowerCase(), exp.id)}
        />
                    {/* <ActionIcon
                      variant="text"
                      onClick={() => handleDelete(title?.toLowerCase(), exp.id)}
                    >
                      <TrashIcon color="red" className="w-5 h-5" />
                    </ActionIcon> */}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ), [data, title, handleDelete, handleEdit, openModal, moveItemUp, moveItemDown]);

  return (
    <div className='border-b border-dashed border-muted py-10'>
      <section>
        <div className='my-2 flex justify-between'>
          <Title>{title}</Title>
          <Button
            onClick={() => openModal({
              view: <Form title={title} onSubmit={handleAdd} />,
              customSize: '720px',
            })}
          >
            {`Add ${title}`}
          </Button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {renderedContent}
        </DragDropContext>
      </section>
    </div>
  );
};

export default React.memo(ProfileSection);
