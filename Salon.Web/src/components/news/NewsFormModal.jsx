import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { NEWS_CATEGORIES } from '../../data/entities';

const initial = {
  title: '',
  category: NEWS_CATEGORIES[0],
  content: '',
  pinned: false,
};

const NewsFormModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((f) => ({
      ...f,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.content.trim()) next.content = 'Content is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      category: form.category,
      content: form.content.trim(),
      pinned: form.pinned,
    });
    setForm(initial);
    setErrors({});
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-gold-900/40';
  const labelClass = 'mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200';
  const errorClass = 'mt-1 text-xs text-red-500';

  return (
    <Modal open={open} onClose={onClose} title="Add a news post">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input className={inputClass} value={form.title} onChange={update('title')} />
          {errors.title && <p className={errorClass}>{errors.title}</p>}
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category} onChange={update('category')}>
            {NEWS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Content</label>
          <textarea
            rows={4}
            className={inputClass}
            value={form.content}
            onChange={update('content')}
          />
          {errors.content && <p className={errorClass}>{errors.content}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
          <input
            type="checkbox"
            checked={form.pinned}
            onChange={update('pinned')}
            className="h-4 w-4 rounded border-neutral-300 text-gold-500 focus:ring-gold-300"
          />
          Pin to top
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewsFormModal;
