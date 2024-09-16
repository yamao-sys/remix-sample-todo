import { BaseButton } from '~/components/atoms/BaseButton';

type Props = {
  labelText: string;
  color: 'green' | 'gray' | 'red';
  additionalStyle?: string;
} & JSX.IntrinsicElements['button'];

export const SubmitButton = ({
  labelText,
  color,
  additionalStyle = '',
  name = 'action',
  value = '',
}: Props) => {
  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='mt-16'>
          <BaseButton
            labelText={labelText}
            color={color}
            additionalStyle={additionalStyle}
            name={name}
            value={value}
          />
        </div>
      </div>
    </>
  );
};
