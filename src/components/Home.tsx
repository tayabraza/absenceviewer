import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import AbsenceViewer from './AbsenceViewer';
import { Absence } from '../types';

function Home(){
    
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = 'https://front-end-kata.brighthr.workers.dev/api';

    useEffect(() => {

        async function fetchAbsences() {
            try {
                const response = await fetch(`${API_BASE}/absences`);
                const data = await response.json();
                setAbsences(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAbsences();
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p><i className="fa fa-spinner fa-spin" style={{fontSize: '72px'}}></i></p>
                <p className='text-xl'>Loading...</p>
            </div>
        )
    }

    return (

        <>

        <Header />

        <main>
            <div className='bg-gray-50 p-10 rounded'>
                <div>
                    <AbsenceViewer absences={absences} />
                </div>
            </div>
        </main>

        <Footer />

        </>

    )
}

export default Home