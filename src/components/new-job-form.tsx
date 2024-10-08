'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { CreateJobValues, createJobSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { jobTypes } from '@/lib/job-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { locationTypes } from '@/lib/location-types';
import LocationInput from './location-input';
import { Label } from './ui/label';
import RichTextEditor from './rich-text-editor';
import { draftToMarkdown } from 'markdown-draft-js';
import LoadingButton from './loading-button';
import { createJob } from '@/app/(home)/jobs/actions';

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    // watch,
    // trigger,
    control,
    // setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJob(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Frontend Developer' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a job type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((jobType) => (
                    <SelectItem key={jobType} value={jobType}>
                      {jobType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='companyName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='companyLogo'
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Company logo</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    fieldValues.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='locationType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationTypes.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='location'
          render={({ field }) => (
            <FormItem className='flex flex-col py-3'>
              <FormLabel>Office location</FormLabel>
              <FormControl>
                <LocationInput
                  value={field.value}
                  onSelect={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-3'>
          <Label>How to apply</Label>
          <div className='flex justify-between'>
            <FormField
              name='applicationEmail'
              control={control}
              render={({ field }) => (
                <FormItem className='grow'>
                  <FormControl>
                    <Input type='email' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className='mx-2 mt-2'>or</span>
            <FormField
              name='applicationUrl'
              control={control}
              render={({ field }) => (
                <FormItem className='grow'>
                  <FormControl>
                    <Input type='url' placeholder='Website' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => setFocus('description')}>Description</Label>
              <FormControl>
                <RichTextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='salary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={isSubmitting} type='submit'>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
