import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { PRODUCT_CATEGORIES } from '../../data/entities';

const initial = {
  name: '',
  category: PRODUCT_CATEGORIES[0],
  description: '',
  price: '',
  stock: '',
};

const ProductFormModal = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('validation.nameRequired');
    if (!form.description.trim()) next.description = t('validation.descriptionRequired');
    if (!form.price || Number(form.price) <= 0) next.price = t('validation.pricePositive');
    if (form.stock === '' || Number(form.stock) < 0) next.stock = t('validation.stockNonNegative');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
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
    <Modal open={open} onClose={onClose} title={t('products.modal.title')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>{t('form.name')}</label>
          <input className={inputClass} value={form.name} onChange={update('name')} />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('form.category')}</label>
          <select className={inputClass} value={form.category} onChange={update('category')}>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('form.description')}</label>
          <textarea
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={update('description')}
          />
          {errors.description && <p className={errorClass}>{errors.description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t('form.price', { currency: t('common.currency') })}</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              value={form.price}
              onChange={update('price')}
            />
            {errors.price && <p className={errorClass}>{errors.price}</p>}
          </div>
          <div>
            <label className={labelClass}>{t('form.stock')}</label>
            <input
              type="number"
              min="0"
              className={inputClass}
              value={form.stock}
              onChange={update('stock')}
            />
            {errors.stock && <p className={errorClass}>{errors.stock}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            {t('common.cancel')}
          </Button>
          <Button type="submit">{t('products.modal.submit')}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
