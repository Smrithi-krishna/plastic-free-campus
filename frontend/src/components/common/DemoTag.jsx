import { DEMO_NOTE } from '../../utils/constants';

/** Marks simulated figures. Required next to any impact statistic. */
export default function DemoTag({ children = 'Demo data' }) {
  return (
    <span className="demo-tag" title={DEMO_NOTE}>
      {children}
    </span>
  );
}
