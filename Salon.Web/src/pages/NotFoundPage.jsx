import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
    <h1 className="font-display text-6xl font-semibold text-primary-500">404</h1>
    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
      The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="mt-8 rounded-full bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
    >
      Back to home
    </Link>
  </section>
);

export default NotFoundPage;
