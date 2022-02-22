import { forwardRef } from 'react';

export type EditButtonProps = {
  // FIXME: type
  component?: any;
  noteId?: string;
  login?: string;
  children: React.ReactNode;
};

const EditButton = forwardRef<React.Ref<HTMLElement>, EditButtonProps>(
  ({ component: Component = 'button', noteId, children, ...props }, ref) => {
    const isDraft = noteId == null;
    return (
      <Component
        {...props}
        ref={ref}
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem"
      >
        {children}
      </Component>
    );
  }
);

EditButton.displayName = 'EditButton';

export default EditButton;
