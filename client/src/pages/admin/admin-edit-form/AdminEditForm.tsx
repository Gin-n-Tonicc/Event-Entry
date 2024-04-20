import { FormEventHandler } from 'react';
import { IDefaultObject } from '../../../types/interfaces/common/IDefaultObject';
import { IObjectWithId } from '../../../types/interfaces/common/IObjectWithId';
import AdminEditFormRow from './admin-edit-form-row/AdminEditFormRow';

export type OnUpdateFunction = (id: number, body: Object) => Promise<boolean>;
export type OnCreateFunction = (body: Object) => Promise<boolean>;

interface AdminEditFormProps {
  currentObj: IObjectWithId;
  columns: string[];
  onUpdate: OnUpdateFunction;
  onCreate: OnCreateFunction;
  closeEdit: () => void;
  editing: boolean;
  creating: boolean;
}

interface AdminFormTitleProps {
  editing: boolean;
  currentObj?: IObjectWithId;
}

// The component that displays the form title
function AdminFormTitle(props: AdminFormTitleProps) {
  return (
    <h1 className="text-center">
      {props.editing
        ? `Editing record with ID=${props.currentObj?.id || '?'}`
        : 'Create record'}
    </h1>
  );
}

// The component that displays and handles the edit form
export default function AdminEditForm(props: AdminEditFormProps) {
  // Handle form
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    type K = string | number | boolean | (string | number | boolean)[] | null;
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // Map the string values to the appropriate types (ex: number, string, arr, etc.)
    const submitData: IDefaultObject<K> = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        let newValue: K = value.toString();
        const isArray = newValue.startsWith('[') && newValue.endsWith(']');

        if (!newValue) {
          newValue = null;
        } else if (!isNaN(Number(newValue))) {
          newValue = Number(newValue);
        } else if (isArray) {
          const values = newValue.substring(1, newValue.length - 1);
          if (values.length <= 0) {
            newValue = [];
          } else {
            newValue = values
              .split(',')
              .map((x) => x.trim())
              .map((x) => (isNaN(Number(x)) ? x : Number(x)));
          }
        }

        const newObj: IDefaultObject<typeof newValue> = {};
        newObj[key] = newValue;

        return Object.assign(acc, newObj);
      },
      {}
    );

    let passed: Promise<boolean>;

    // Decide which handler to use
    if (props.editing) {
      passed = props.onUpdate(props.currentObj.id, submitData);
    } else if (props.creating) {
      passed = props.onCreate(submitData);
    } else {
      // Empty promise so we comply with the required type
      passed = Promise.resolve(true);
    }

    if (await passed) {
      props.closeEdit();
    }
  };

  return (
    <div className="mt-4">
      <AdminFormTitle {...props} />

      <form
        onSubmit={onSubmit}
        className="d-flex flex-column align-items-center justify-content-between gap-5 mt-4">
        <div className="w-100 d-flex  flex-column justify-content-between gap-5">
          {/* Add an input field for each column */}
          {props.columns.map((x) => (
            <AdminEditFormRow
              key={x}
              columnName={x}
              value={props.currentObj[x]}
            />
          ))}
        </div>
        <button
          className="btn btn-primary btn-login text-uppercase fw-bold mt-4"
          style={{ cursor: 'pointer' }}
          type="submit">
          <i className="fa fa-plus"></i> Save
        </button>
      </form>
    </div>
  );
}
