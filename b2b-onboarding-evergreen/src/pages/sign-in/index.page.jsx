import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import cn from 'classnames';
import Head from 'next/head';

import { path } from 'pages/routes';

import Input from 'components/Input';
import Button from 'components/Button';
import Link from 'components/Link';
import MemoCard from 'components/MemoCard';

import styles from './styles.module.css';

const schema = yup.object().shape({
  username: yup.string().max(64).email('Username format is incorrect.').required('Field is required.'),
  password: yup.string().required('Password incorrect.'),
});

const SignIn = () => {
  const {
    handleSubmit, formState: { errors }, setError, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // sign in
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Sign In</h2>
          <div className={styles.line} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.inputWrapper}>
            <Input
              name="username"
              placeholder="Username"
              control={control}
              error={errors.username}
            />
            {errors.username && (
            <Link
              type="url"
              href="#"
              className={styles.forgotLink}
            >
              Forgot username?
            </Link>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              control={control}
              error={errors.password}
            />

            <Link
              type="url"
              href="#"
              className={cn(styles.forgotLink, !errors.password && styles.forgotPasswordLink)}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className={styles.button}
            loading={loading}
            htmlType="submit"
          >
            Sign In
          </Button>

          <div className={styles.description}>
            <p>Don’t have an account?</p>
            <Link
              type="router"
              href={path.signUp}
              className={styles.signUplink}
            >
              Sign up now
            </Link>
          </div>

        </form>
        <MemoCard items={errors.credentials} />
      </div>
    </>
  );
};

export default SignIn;
