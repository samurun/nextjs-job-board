import { useFormState } from 'react-dom';
import { approveSubmission } from '../admin/actions';
import FormSubmitButton from '@/components/form-submit-button';

type Props = {
  jobId: number;
};
export default function ApproveSubmissionButton({ jobId }: Props) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction}>
      <input hidden name='jobId' defaultValue={jobId} />
      <FormSubmitButton className='w-full bg-green-500 hover:bg-green-600'>
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className='text-sm text-red-500'>{formState.error}</p>
      )}
    </form>
  );
}
