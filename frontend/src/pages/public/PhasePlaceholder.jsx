import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/ui/EmptyState';
import { STAFF_NAV, STUDENT_NAV, findNavItem } from '../../utils/navigation';

// Temporary. Each route below is replaced by its real page in Phase 4 (student) and Phase 5 (staff).
export default function PhasePlaceholder({ portal }) {
  const { pathname } = useLocation();
  const item = findNavItem(portal === 'staff' ? STAFF_NAV : STUDENT_NAV, pathname);
  const phase = portal === 'staff' ? 5 : 4;
  return (
    <>
      <PageHeader title={item?.label ?? 'Page'} description="The shell, navigation and theme are working. The content for this page is built in a later phase." />
      <EmptyState title={`Built in Phase ${phase}`}>
        This route is wired into the {portal} navigation and will be filled in with its own layout.
      </EmptyState>
    </>
  );
}
