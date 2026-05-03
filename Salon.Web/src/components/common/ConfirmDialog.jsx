import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  danger = true,
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} title={title || t('common.confirm')} size="sm">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {message || t('common.removeConfirmGeneric')}
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel || t('common.cancel')}
        </Button>
        <Button
          variant={danger ? 'danger' : 'primary'}
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        >
          {confirmLabel || t('common.confirm')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
