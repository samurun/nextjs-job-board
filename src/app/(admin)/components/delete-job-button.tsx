import { useFormState } from 'react-dom';
import { deleteJob } from '../admin/actions';
import FormSubmitButton from '@/components/form-submit-button';

type Props = {
  jobId: number;
};

export default function DeleteJobButton({ jobId }: Props) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className='space-y-1'>
      <input hidden name='jobId' defaultValue={jobId} />
      <FormSubmitButton className='w-full bg-red-500 hover:bg-red-600'>
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className='text-sm text-red-500'>{formState.error}</p>
      )}
    </form>
  );
}
