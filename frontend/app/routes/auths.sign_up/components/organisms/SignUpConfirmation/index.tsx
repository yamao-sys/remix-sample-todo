import { SignUpBaseLayout } from '../SignUpBaseLayout';
import { BaseButton } from '~/components/atoms/BaseButton';
import { SerializeFrom } from '@remix-run/node';
import { SignUpDto } from '~/generated/auth/@types';
import { Form } from '@remix-run/react';
import { InputForm } from '~/components/atoms/InputForm';

type Props = {
  signUpInput: SerializeFrom<SignUpDto>;
};

export const SignUpConfirmation = ({ signUpInput }: Props) => {
  return (
    <>
      <SignUpBaseLayout phase='confirm'>
        <Form method='post'>
          <div className='flex w-full justify-around'>
            <div className='w-1/2 align-middle'>ユーザ名: </div>
            <div className='w-1/2 align-middle'>test_name</div>
            <InputForm
              labelId='name'
              labelText='ユーザ名'
              type='hidden'
              name='name'
              value={signUpInput.name}
            />
          </div>
          <div className='flex w-full justify-around mt-8'>
            <div className='w-1/2 align-middle'>メールアドレス: </div>
            <div className='w-1/2 align-middle'>test_email</div>
            <InputForm
              labelId='name'
              labelText='メールアドレス'
              type='hidden'
              name='email'
              value={signUpInput.email}
            />
          </div>
          <div className='flex w-full justify-around mt-8'>
            <div className='w-1/2 align-middle'>パスワード: </div>
            <div className='w-1/2 align-middle'>{'*'.repeat(signUpInput.password.length)}</div>
            <InputForm
              labelId='name'
              labelText='パスワード'
              type='hidden'
              name='password'
              value={signUpInput.password}
            />
            <InputForm
              labelId='name'
              labelText='パスワード'
              type='hidden'
              name='passwordConfirm'
              value={signUpInput.passwordConfirm}
            />
          </div>
          <div className='flex w-full justify-around mt-16'>
            <BaseButton labelText='入力へ戻る' color='gray' value='back' />
            <BaseButton labelText='登録する' color='green' value='register' />
          </div>
        </Form>
      </SignUpBaseLayout>
    </>
  );
};
