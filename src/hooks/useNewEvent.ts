import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

type ChangeHandlerDate = Date | Date[] | null | undefined;

const useNewEvent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [newEvent, setNewEvent] = useState({
    title: 'Event de test',
    location: 'Place Bellecour',
    eProtecLink: 'https://www.eprotec.fr',
    comment: 'Ceci est un essai',
    start: new Date(),
    end: new Date(),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiResponseEvent = await Api.createEvent(newEvent);
      navigate('/dashboard/event/' + apiResponseEvent._id);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    }
  };

  const setStartDate = ({ date }: { date: ChangeHandlerDate }) => {
    if (date instanceof Date) {
      setNewEvent({ ...newEvent, start: date });
    }
  };

  const setStartTime = (value: Date | null) => {
    if (value instanceof Date) {
      setNewEvent({
        ...newEvent,
        start: new Date(
          newEvent.start.getFullYear(),
          newEvent.start.getMonth(),
          newEvent.start.getDate(),
          value.getHours(),
          value.getMinutes(),
        ),
      });
    }
  };

  const setEndDate = ({ date }: { date: ChangeHandlerDate }) => {
    if (date instanceof Date) {
      setNewEvent((prevEvent) => ({ ...prevEvent, end: date }));
    }
  };

  const setEndTime = (value: Date | null) => {
    if (value instanceof Date) {
      setNewEvent({
        ...newEvent,
        end: new Date(
          newEvent.end.getFullYear(),
          newEvent.end.getMonth(),
          newEvent.end.getDate(),
          value.getHours(),
          value.getMinutes(),
        ),
      });
    }
  };

  return {
    newEvent,
    handleChange,
    handleSubmit,
    errorMessage,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
  };
};

export default useNewEvent;
