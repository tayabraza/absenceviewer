import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AbsenceViewer from '../components/AbsenceViewer';

test('renders absence table correctly', async () => {
    render(<AbsenceViewer absences={[]} />);

    await waitFor(() => {
        expect(screen.getByText('Rahaf Deckard')).toBeInTheDocument();
        expect(screen.getByText('Enya Behm')).toBeInTheDocument();
    });

    expect(screen.getByText('SICKNESS')).toBeInTheDocument();
    expect(screen.getByText('ANNUAL_LEAVE')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
});