
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTravel, deselectTravel } from '../redux/actions';
import { PlanItem } from '../types';

interface EditTravelFormProps {
  travel: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    budget: number;
    plan: PlanItem[];
  };
}

const EditTravelForm: React.FC<EditTravelFormProps> = ({ travel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(travel.name);
  const [startDate, setStartDate] = useState(travel.startDate);
  const [endDate, setEndDate] = useState(travel.endDate);
  const [budget, setBudget] = useState(travel.budget.toString()); // Приводим к строке

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editedTravel = {
      ...travel,
      name,
      startDate,
      endDate,
      budget: parseFloat(budget),
    };

    dispatch(editTravel(editedTravel));
    dispatch(deselectTravel());
  };

  const handleCancel = () => {
    dispatch(deselectTravel());
  };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Название:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Начальная дата:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </label>
            <label>
                Конечная дата:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </label>
            <label>
                Бюджет:
                <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} required />
            </label>
            <button type="submit">Сохранить изменения</button>
            <button type="button" onClick={handleCancel}>Отмена</button>
        </form>
    );
};

export default EditTravelForm;