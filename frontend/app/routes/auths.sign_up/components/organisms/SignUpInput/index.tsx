import type { ActionFunctionArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { Form, json, useActionData, useLoaderData } from '@remix-run/react';
import { FC, useState } from 'react';
import { PhaseType } from '../../../types';
import { SignUpBaseLayout } from '../SignUpBaseLayout';
import { BaseFormBox } from '~/components/atoms/BaseFormBox';
import { InputForm } from '~/components/atoms/InputForm';
import { SubmitButton } from '~/components/molecules/SubmitButton';
import { SignUpDto, ValidateSignUpResponseDto } from '~/generated/auth/@types';
import { ValidationErrors } from '~/components/molecules/ValidationErrors';

type Props = {
  signUpInput: SerializeFrom<SignUpDto>;
  validationErrors: SerializeFrom<ValidateSignUpResponseDto>;
};

const INITIAL_VALIDATION_ERRORS = {
  errors: {
    name: [],
    email: [],
    password: [],
    passwordConfirm: [],
  },
};

export const SignUpInput: FC<Props> = ({
  signUpInput,
  validationErrors = INITIAL_VALIDATION_ERRORS,
}: Props) => {
  return (
    <>
      <SignUpBaseLayout phase='form'>
        <Form method='post'>
          <BaseFormBox needsMargin={false}>
            <InputForm labelId='name' labelText='ユーザ名' name='name' value={signUpInput.name} />
            {!!validationErrors.errors?.name?.length && (
              <ValidationErrors messages={validationErrors.errors.name} />
            )}
          </BaseFormBox>

          <BaseFormBox>
            <InputForm
              labelId='email'
              labelText='メールアドレス'
              name='email'
              value={signUpInput.email}
            />
            {!!validationErrors.errors?.email?.length && (
              <ValidationErrors messages={validationErrors.errors.email} />
            )}
          </BaseFormBox>

          <BaseFormBox>
            <InputForm labelId='password' labelText='パスワード' type='password' name='password' />
            {!!validationErrors.errors?.password?.length && (
              <ValidationErrors messages={validationErrors.errors.password} />
            )}
          </BaseFormBox>

          <BaseFormBox>
            <InputForm
              labelId='password-confirm'
              labelText='パスワード確認用'
              type='password'
              name='password_confirm'
            />
            {!!validationErrors.errors?.passwordConfirm?.length && (
              <ValidationErrors messages={validationErrors.errors.passwordConfirm} />
            )}
          </BaseFormBox>

          <SubmitButton labelText='確認画面へ' color='green' value='validate' />
        </Form>
      </SignUpBaseLayout>
    </>
  );
};
