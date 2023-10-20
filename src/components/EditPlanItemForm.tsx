import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPlanItem } from '../redux/actions';

interface PlanItem {
  id: number;
  name: string;
  date: string; 
  description: string;
  amount: number;
}

interface EditPlanItemFormProps {
  planItem: PlanItem;
  onClose: () => void;
}

const EditPlanItemForm: React.FC<EditPlanItemFormProps> = ({ planItem, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(planItem.name);
  const [date, setDate] = useState(planItem.date);
  const [description, setDescription] = useState(planItem.description);
  const [amount, setAmount] = useState(planItem.amount.toString()); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editedPlanItem: PlanItem = {
      ...planItem,
      name,
      date,
      description,
      amount: parseFloat(amount),
    };

    dispatch(editPlanItem(editedPlanItem));
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Дата:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Описание:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Сумма:
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </label>
      <button type="submit">Сохранить изменения</button>
      <button type="button" onClick={onClose}>Отмена</button>
    </form>
  );
};

export default EditPlanItemForm;