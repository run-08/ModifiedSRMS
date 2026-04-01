import { useState, useEffect } from 'react';
import logoImage from "../../assets/6a56b7838cf31838f0fba6cca802e2451a20c6b8.png";

interface StudentData {
  name: string;
  registernumber: string;
  sem: string;
  student: {
    subjectcode: string[];
    nameofthecourse: string[];
    grade: string[];
    result: string[];
    credit: string[];
    gpa: string[];
  };
}

export default function ResultPage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  useEffect(() => {
    // Auto-prompt on load
    const timer = setTimeout(() => {
      promptForRegisterNumber();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const promptForRegisterNumber = () => {
    const registernumber = prompt("Enter The Register Number:");
    if (registernumber) {
      fetchResultPage(registernumber);
    }
  };

  const fetchResultPage = async (registernumber: string) => {
    if (!registernumber) {
      alert("Please fill the register number!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://arun-dbservice.onrender.com/getMarkByRegisterNumber?registerNumber=${registernumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.log(error);
      alert("Error fetching student data. Please check the register number.");
    } finally {
      setLoading(false);
    }
  };

  const tableRows = studentData
    ? studentData.student?.subjectcode?.map((_, index) => ({
        sno: index + 1,
        subjectcode: studentData.student.subjectcode[index],
        nameofthecourse: studentData.student.nameofthecourse[index],
        grade: studentData.student.grade[index],
        result: studentData.student.result[index],
        credit: studentData.student.credit[index],
        gpa: studentData.student.gpa[index],
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-teal-700 p-4 flex items-center justify-between shadow-lg">
        <img src={logoImage} alt="VSB Logo" className="h-16 w-16 rounded-lg object-cover shadow-md" />
        <button
          onClick={() => setShowNavMenu(!showNavMenu)}
          className="cursor-pointer text-white text-2xl bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {showNavMenu && (
        <div className="lg:hidden bg-teal-600 shadow-lg">
          <button className="cursor-pointer w-full text-white py-3 px-4 text-left border-b border-white/20 hover:bg-teal-500 transition-colors">
            Student's Profile
          </button>
          <button className="cursor-pointer w-full text-white py-3 px-4 text-left border-b border-white/20 hover:bg-teal-500 transition-colors">
            Int.Assessments
          </button>
          <button className="cursor-pointer w-full text-white py-3 px-4 text-left border-b border-white/20 hover:bg-teal-500 transition-colors">
            End Sem Results
          </button>
          <button className="cursor-pointer w-full text-white py-3 px-4 text-left border-b border-white/20 hover:bg-teal-500 transition-colors">
            Exam Registration
          </button>
          <button className="cursor-pointer w-full text-white py-3 px-4 text-left hover:bg-teal-500 transition-colors">
            Open Elective Reg
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 bg-teal-700 relative">
          <img
            src={logoImage}
            alt="VSB Logo"
            className="absolute top-2 left-2 w-44 h-36 rounded-2xl object-cover z-10"
          />
          <div className="flex flex-col pt-40 space-y-3 px-2">
            <button className="cursor-pointer text-white py-3 px-4 rounded-lg border-b border-r border-white/50 hover:text-teal-300 hover:bg-teal-600 transition-all">
              Student's Profile
            </button>
            <button className="cursor-pointer text-white py-3 px-4 rounded-lg border-b border-r border-white/50 hover:text-teal-300 hover:bg-teal-600 transition-all">
              Int.Assessments
            </button>
            <button className="cursor-pointer text-white py-3 px-4 rounded-lg border-b border-r border-white/50 hover:text-teal-300 hover:bg-teal-600 transition-all">
              End Sem Results
            </button>
            <button className="cursor-pointer text-white py-3 px-4 rounded-lg border-b border-r border-white/50 hover:text-teal-300 hover:bg-teal-600 transition-all">
              Exam Registration
            </button>
            <button className="cursor-pointer text-white py-3 px-4 rounded-lg border-b border-r border-white/50 hover:text-teal-300 hover:bg-teal-600 transition-all">
              Open Elective Reg
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar - Desktop */}
          <div className="hidden lg:block bg-teal-700 py-6 px-8">
            <div className="flex justify-between items-start">
              <div className="text-white ml-8">
                <h3 className="text-xl font-semibold">V.S.B ENGINEERING COLLEGE</h3>
                <h5 className="text-sm mt-1">(An Autonomous Institution)</h5>
                <h5 className="text-sm">Approved by AICTE, Affiliated to Anna University</h5>
              </div>
              <div className="text-white text-right">
                <p className="mb-2">
                  User: <span className="font-semibold">{studentData?.name || 'N/A'}</span>
                </p>
                <p className="mb-2">
                  Register No: <span className="font-semibold">{studentData?.registernumber || 'N/A'}</span>
                </p>
                <a href="/logout" className="text-white underline hover:text-teal-200">
                  LogOut
                </a>
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="lg:hidden bg-teal-600 p-4 text-white text-sm">
            <p>User: <span className="font-semibold">{studentData?.name || 'N/A'}</span></p>
            <p>Register No: <span className="font-semibold">{studentData?.registernumber || 'N/A'}</span></p>
          </div>

          {/* Result Content */}
          <div className="flex-1 p-4 md:p-8 lg:p-12">
            <div className="bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden">
              {/* Semester Header */}
              <div className="bg-purple-600 text-white text-center py-4 px-4">
                <h2 className="text-lg md:text-xl font-semibold">
                  {studentData
                    ? `Results Of ${studentData.sem}th Semester Examination`
                    : 'Results Of Semester Examination'}
                </h2>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-xl text-gray-600">Loading...</div>
                </div>
              ) : !studentData ? (
                <div className="flex flex-col items-center justify-center py-20 px-4">
                  <p className="text-xl text-gray-600 mb-4 text-center">No data loaded</p>
                  <button
                    onClick={promptForRegisterNumber}
                    className="cursor-pointer px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                  >
                    Load Student Data
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto p-4 md:p-8">
                  <table className="w-full border-collapse border-2 border-gray-500 shadow-lg">
                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
                      <tr>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          S.NO
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          Subject Code
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          Name of The Course
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          Grade
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          Result
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          Credit
                        </th>
                        <th className="border-2 border-gray-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">
                          GPA
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows?.map((row) => (
                        <tr key={row.sno} className="hover:bg-purple-50 transition-colors">
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base bg-gray-100">
                            {row.sno}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.subjectcode}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.nameofthecourse}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.grade}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.result}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.credit}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 text-center font-semibold text-sm md:text-base">
                            {row.gpa}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
