import { AuthProvider } from './AuthProvider';
import { ServicesProvider } from './ServicesProvider';
import { ProductsProvider } from './ProductsProvider';
import { BookingsProvider } from './BookingsProvider';
import { NewsProvider } from './NewsProvider';

const DataProviders = ({ children }) => (
  <AuthProvider>
    <ServicesProvider>
      <ProductsProvider>
        <BookingsProvider>
          <NewsProvider>{children}</NewsProvider>
        </BookingsProvider>
      </ProductsProvider>
    </ServicesProvider>
  </AuthProvider>
);

export default DataProviders;
