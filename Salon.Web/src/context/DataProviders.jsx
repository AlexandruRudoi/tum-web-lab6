import { ServicesProvider } from './ServicesProvider';
import { ProductsProvider } from './ProductsProvider';
import { BookingsProvider } from './BookingsProvider';
import { NewsProvider } from './NewsProvider';

const DataProviders = ({ children }) => (
  <ServicesProvider>
    <ProductsProvider>
      <BookingsProvider>
        <NewsProvider>{children}</NewsProvider>
      </BookingsProvider>
    </ProductsProvider>
  </ServicesProvider>
);

export default DataProviders;
