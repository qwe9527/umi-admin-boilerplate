import dynamic from 'umi/dynamic';
import CodeLoadingComponent from '@/components/CodeLoadingComponent';

const AsyncComponent = (path, delay = 300) => dynamic({
  loader: () => import(path),
  loading: CodeLoadingComponent,
  delay
});

export default AsyncComponent;
