import { useState } from "react";
import { Absence } from "../types";

function AbsenceViewer(props: { absences: Absence[]}) {
    const { absences } = props;
    const [allAbsences, setAllAbsences] = useState<Absence[]>([]);
    const [conflict, setConflict] = useState<boolean[]>([]);
    const conf: boolean[] = [];
    const uniqueData = absences.filter((item, index, self) => index === self.findIndex(obj => obj.employee.id === item.employee.id) );
    const modal = document.getElementById("modal");

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });

    const showAllAbsences = (event:any) => {
        const allDetail = absences.filter((item) => item.employee.id === event.target.parentElement.id );

        try {
            allDetail.forEach( async (item) => {
                const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/conflict/' + item.id );
                const data = await response.json();
                conf.push(data.conflicts);
                setConflict([...conf])
            });
        } catch (error) {
            console.error(error);
        } finally {
            setAllAbsences(allDetail)
            modal?.classList.remove("hidden");
            console.log(conflict)
        }


    }

    return (

        <div className="overflow-auto">
            <table className="table-auto overflow-auto border-collapse border border-gray-200 w-full">
                <thead>
                <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                        <th className="border border-gray-300 px-4 py-2">Start Date</th>
                        <th className="border border-gray-300 px-4 py-2">Days</th>
                        <th className="border border-gray-300 px-4 py-2">Absence Type</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    uniqueData.map((absence) => {

                        return (
                            <tr key={absence.id} id={absence.employee.id} data-id={absence.id} className="text-center odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-start cursor-pointer" onClick={showAllAbsences} >{absence.employee.firstName} {absence.employee.lastName}</td>
                                <td className="border border-gray-300 px-4 py-2">{absence.startDate.slice(0,10)}</td>
                                <td className="border border-gray-300 px-4 py-2">{absence.days}</td>
                                <td className="border border-gray-300 px-4 py-2">{absence.absenceType}</td>
                                <td className="border border-gray-300 px-4 py-2">{absence.approved === true ? 'Approved' : 'Pending' }</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            <div id="modal" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center hidden">
                <div className="bg-white rounded-lg shadow-lg p-8 w-auto overflow-scroll">

                    {allAbsences.map( (employee) => {
                        return (
                            <h2 key={employee.id} className="employee-name text-xl font-bold text-gray-800 text-center mb-5">{employee.employee.firstName} {employee.employee.lastName}</h2>
                        );
                    })}

                    <table>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2">Days</th>
                                <th className="border border-gray-300 px-4 py-2">Absence Type</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Conflict</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allAbsences.map( (employee, index) => {
                                return (
                                    <tr key={employee.id} >
                                        <td className="border border-gray-300 px-4 py-2">{employee.startDate.slice(0,10)}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.days}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.absenceType}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.approved === true ? 'Approved' : 'Pending' }</td>
                                        <td className="border border-gray-300 px-4 py-2">{conflict[index] === true ? 'Yes' : 'No' }</td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>

                </div>
            </div>

        </div>

    );
};

export default AbsenceViewer;