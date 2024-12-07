import React, { FC, useEffect, useState } from 'react';
import { SignUpTemplate } from './components/SignUpTemplate';
import { ActionFunctionArgs, json, SerializeFrom } from '@remix-run/node';
import { SignUpDto, ValidateSignUpResponseDto } from '~/generated/auth/@types';
import { postSignUp, postValidateSignUp } from '~/apis/authApi.client';
import { PhaseType } from './types';
import { ClientActionFunctionArgs, Form, useActionData } from '@remix-run/react';
import { SignUpInput } from './components/organisms/SignUpInput';
import { SignUpConfirmation } from './components/organisms/SignUpConfirmation';
import { SignUpThanks } from './components/organisms/SignUpThanks';
import { SignUpBaseLayout } from './components/organisms/SignUpBaseLayout';
import { BaseFormBox } from '~/components/atoms/BaseFormBox';
import { InputForm } from '~/components/atoms/InputForm';
import { ValidationErrors } from '~/components/molecules/ValidationErrors';
import { SubmitButton } from '~/components/molecules/SubmitButton';
import { BaseButton } from '~/components/atoms/BaseButton';

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   if (!formData.has('action')) {
//     throw new Error('invalid form post');
//   }

//   const postData: SignUpDto = {
//     name: (formData.get('name') as string) ?? '',
//     email: (formData.get('email') as string) ?? '',
//     password: (formData.get('password') as string) ?? '',
//     passwordConfirm: (formData.get('password_confirm') as string) ?? '',
//   };
//   const action = formData.get('action');
//   switch (action) {
//     case 'validate':
//       const validateSignUpResponse = await postValidateSignUp(postData);
//       return json({ signUpInput: postData, errors: validateSignUpResponse.errors });
//     case 'back':
//       return json({ signUpInput: postData, errors: {} });
//     case 'register':
//       await postSignUp(postData);
//       break;
//   }
// };

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  if (!formData.has('action')) {
    throw new Error('invalid form post');
  }

  const postData: SignUpDto = {
    name: (formData.get('name') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    password: (formData.get('password') as string) ?? '',
    passwordConfirm: (formData.get('password_confirm') as string) ?? '',
  };
  const action = formData.get('action');
  switch (action) {
    case 'validate':
      const validateSignUpResponse = await postValidateSignUp(postData);
      return json({ signUpInput: postData, errors: validateSignUpResponse.errors });
    case 'back':
      return json({ signUpInput: postData, errors: {} });
    case 'register':
      await postSignUp(postData);
      break;
  }
};

const INITIAL_SIGN_UP_INPUTS = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const AuthSignUpPage: FC = () => {
  const [phase, setPhase] = useState<PhaseType>('input');
  const [signUpInput, setSignUpInput] = useState<SignUpDto>(INITIAL_SIGN_UP_INPUTS);

  const actionData = useActionData<{ signUpInput: SignUpDto; errors: ValidateSignUpResponseDto }>();

  const [validationErrors, setValidationErrors] = useState<
    SerializeFrom<ValidateSignUpResponseDto>
  >({ errors: {} });

  useEffect(() => {
    setSignUpInput(actionData?.signUpInput ?? INITIAL_SIGN_UP_INPUTS);
    if (Object.keys(actionData?.errors ?? {}).length) {
      setValidationErrors(actionData?.errors ?? { errors: {} });
      return;
    }
    if (!actionData?.signUpInput) return;

    // バリデーションエラーがなければ、次の画面へ遷移
    switch (phase) {
      case 'input':
        setPhase('confirmation');
        break;
      case 'confirmation':
        setPhase('thanks');
        break;
    }
  }, [actionData]);

  const phaseComponent = () => {
    switch (phase) {
      case 'input':
        return (
          <SignUpBaseLayout phase='form'>
            <Form method='post'>
              <BaseFormBox needsMargin={false}>
                <InputForm
                  labelId='name'
                  labelText='ユーザ名'
                  name='name'
                  value={signUpInput.name}
                />
                {/* {!!validationErrors.name?.length && (
              <ValidationErrors messages={actionData.errors.name} />
            )} */}
              </BaseFormBox>

              <BaseFormBox>
                <InputForm
                  labelId='email'
                  labelText='メールアドレス'
                  name='email'
                  value={signUpInput.email}
                />
                {/* {!!actionData?.errors?.email?.length && (
              <ValidationErrors messages={actionData.errors.email} />
            )} */}
              </BaseFormBox>

              <BaseFormBox>
                <InputForm
                  labelId='password'
                  labelText='パスワード'
                  type='password'
                  name='password'
                />
                {/* {!!validationErrors.errors?.password?.length && (
              <ValidationErrors messages={validationErrors.errors.password} />
            )} */}
              </BaseFormBox>

              <BaseFormBox>
                <InputForm
                  labelId='password-confirm'
                  labelText='パスワード確認用'
                  type='password'
                  name='password_confirm'
                />
                {/* {!!validationErrors.errors?.passwordConfirm?.length && (
              <ValidationErrors messages={validationErrors.errors.passwordConfirm} />
            )} */}
              </BaseFormBox>

              <SubmitButton labelText='確認画面へ' color='green' value='validate' />
            </Form>
          </SignUpBaseLayout>
        );
      case 'confirmation':
        return (
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
        );
      case 'thanks':
        return (
          <SignUpBaseLayout phase='thanks'>
            <div className='flex justify-center'>
              <div>会員登録が完了しました。</div>
              <div>ご登録いただきありがとうございます。</div>
            </div>
          </SignUpBaseLayout>
        );
    }
  };

  return <>{phaseComponent()}</>;
};

export default AuthSignUpPage;
