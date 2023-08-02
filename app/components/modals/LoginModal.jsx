'use client';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState } from 'react';
import { useInput, useModal } from '@/hooks';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import Modal from './Modal';

const LoginModal = () => {
  const modal = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(value =>
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value.trim())
  );
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length > 5);

  const formIsValid = emailIsValid && passwordIsValid;

  const handleSubmit = async () => {
    if (!formIsValid) return;

    const data = {
      email,
      password,
    };
    setIsLoading(true);
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });
    setIsLoading(false);
    modal.loginOnClose();

    router.refresh();

    if (res.error) {
      toast.error(res?.error || 'Something went wrong!', {
        duration: 4000,
      });
      return;
    }
    toast.success('Signed in successfully', {
      duration: 4000,
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back!"
        subtitle="Login to your account."
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        error={emailHasError}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={email}
        errorTitle="Please provide a valid email address."
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        error={passwordHasError}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={password}
        errorTitle="Please provide a valid password."
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button
        Icon={FcGoogle}
        disabled={isLoading}
        label="Continue with Google"
        outline
        type="button"
        onClick={() => signIn('google')}
      />
      <Button
        Icon={AiFillGithub}
        disabled={isLoading}
        label="Continue with Github"
        outline
        type="button"
        onClick={() => signIn('github')}
      />
      <div>
        <p className="text-center text-gray-500">
          You don&apos;t have an account yet?
          <span
            onClick={() => {
              modal.loginOnClose();
              modal.registerOnOpen();
            }}
            className="text-rose-500 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading || !formIsValid}
      isOpen={modal.loginIsOpen}
      title="Login"
      actionLabel="Continue"
      handleSubmit={handleSubmit}
      onClose={modal.loginOnClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
