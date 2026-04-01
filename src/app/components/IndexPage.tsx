import { useState, useEffect, FormEvent } from 'react';

interface SubjectRow {
  id: number;
  subjectcode: string;
  nameofthecourse: string;
  credit: string;
  grade: string;
  gpa: string;
  result: string;
}

export default function IndexPage() {
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { id: 1, subjectcode: '', nameofthecourse: '', credit: '', grade: '', gpa: '', result: '' }
  ]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  // Dynamic animated background boxes
  useEffect(() => {
    const container = document.getElementById('boxcontainer');
    if (!container) return;

    const generateBoxes = () => {
      container.innerHTML = '';
      for (let i = 0; i <= 10; i++) {
        const box = document.createElement('div');
        box.className = 'animated-box';
        const size = Math.random() * 200 + 20;
        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.left = `${Math.random() * 100}%`;
        container.appendChild(box);
      }
    };

    generateBoxes();
    const interval = setInterval(generateBoxes, 3000);
    return () => clearInterval(interval);
  }, []);

  const addSubjectRow = () => {
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    setSubjects([...subjects, {
      id: newId,
      subjectcode: '',
      nameofthecourse: '',
      credit: '',
      grade: '',
      gpa: '',
      result: ''
    }]);
  };

  const deleteSubjectRow = (id: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: number, field: keyof SubjectRow, value: string) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userName = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!userName || !password) {
      alert("Email and password are required!");
      return;
    }

    const object: any = {
      name,
      registernumber: registerNumber,
      sem: semester,
      student: {
        subjectcode: [],
        nameofthecourse: [],
        credit: [],
        grade: [],
        gpa: [],
        result: []
      }
    };

    subjects.forEach(subject => {
      object.student.subjectcode.push(subject.subjectcode);
      object.student.nameofthecourse.push(subject.nameofthecourse);
      object.student.credit.push(subject.credit);
      object.student.grade.push(subject.grade);
      object.student.gpa.push(subject.gpa);
      object.student.result.push(subject.result);
    });

    try {
      const response = await fetch("https://studentresultservice.onrender.com/saveMark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(`${userName}:${password}`)
        },
        body: JSON.stringify(object),
      });

      const data = await response.json();
      console.log("Success:", data);
      if (data?.success) {
        alert("Data Saved Successfully");
        setSubjects([{ id: 1, subjectcode: '', nameofthecourse: '', credit: '', grade: '', gpa: '', result: '' }]);
        setName('');
        setRegisterNumber('');
        setSemester('');
      } else {
        alert("Failed to store");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Error occurred while saving data");
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const deleteRegNo = (document.getElementById("deleteRegisterNumber") as HTMLInputElement)?.value;
    const userName = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!userName || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const response = await fetch(
        `https://studentresultservice.onrender.com/deleteStudentMarkByRegisterNumber?registerNumber=${deleteRegNo}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${userName}:${password}`)
          }
        }
      );

      const data = await response.json();
      alert("Mark deleted Successfully!");
      console.log(data);
      setShowDeleteForm(false);
    } catch (error) {
      alert("Register number doesn't exist in DB!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-8 px-4 md:py-12 relative overflow-hidden">
      {/* Animated Background Boxes */}
      <div id="boxcontainer" className="fixed inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 mb-8 md:mb-12">
          Student's Mark Registration Page
        </h1>

        {/* Student Info Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label htmlFor="name" className="font-bold text-teal-700 md:w-48">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter The Name"
                  className="flex-1 px-4 py-3 bg-transparent border-b-2 border-black text-center focus:outline-none focus:border-teal-600 text-lg"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label htmlFor="rgno" className="font-bold text-teal-700 md:w-48">
                  Register Number
                </label>
                <input
                  type="number"
                  id="rgno"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="Enter The Register Number"
                  className="flex-1 px-4 py-3 bg-transparent border-b-2 border-black text-center focus:outline-none focus:border-teal-600 text-lg"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label htmlFor="sem" className="font-bold text-teal-700 md:w-48">
                  Semester
                </label>
                <input
                  type="text"
                  id="sem"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="Enter The Sem"
                  className="flex-1 px-4 py-3 bg-transparent border-b-2 border-black text-center focus:outline-none focus:border-teal-600 text-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer mt-6 w-full md:w-auto mx-auto block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Subjects Table */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border-2 border-teal-400">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-teal-600">
                <tr>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">S.No</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Subject Code</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Name Of The Course</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Credit</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Grade</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">GPA</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Result</th>
                  <th className="border-2 border-teal-500 px-2 py-3 text-center text-sm md:text-base font-bold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.id} className="hover:bg-teal-50 transition-colors">
                    <td className="border-2 border-teal-400 px-2 py-3 text-center font-semibold text-sm md:text-base bg-gray-100">
                      {index + 1}
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.subjectcode}
                        onChange={(e) => updateSubject(subject.id, 'subjectcode', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="Code"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.nameofthecourse}
                        onChange={(e) => updateSubject(subject.id, 'nameofthecourse', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="Course Name"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.credit}
                        onChange={(e) => updateSubject(subject.id, 'credit', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="Credit"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.grade}
                        onChange={(e) => updateSubject(subject.id, 'grade', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="Grade"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.gpa}
                        onChange={(e) => updateSubject(subject.id, 'gpa', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="GPA"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2">
                      <input
                        type="text"
                        value={subject.result}
                        onChange={(e) => updateSubject(subject.id, 'result', e.target.value)}
                        className="w-full text-center bg-transparent focus:outline-none focus:bg-teal-50 text-sm md:text-base px-2 py-2"
                        placeholder="Result"
                      />
                    </td>
                    <td className="border-2 border-teal-400 px-2 py-2 text-center">
                      <button
                        onClick={() => deleteSubjectRow(subject.id)}
                        className="cursor-pointer px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                        disabled={subjects.length === 1}
                        title={subjects.length === 1 ? "Cannot delete the last row" : "Delete this row"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-50 border-t-2 border-teal-400">
            <button
              onClick={addSubjectRow}
              className="cursor-pointer px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-base md:text-lg"
            >
              Add More Marks
            </button>
            <p className="text-sm md:text-base text-gray-600 italic">
              Total Subjects: <span className="font-bold text-teal-600">{subjects.length}</span>
            </p>
          </div>
        </div>

        {/* Delete Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 border-2 border-teal-300 shadow-lg">
          {!showDeleteForm ? (
            <button
              onClick={() => setShowDeleteForm(true)}
              className="cursor-pointer text-red-600 font-semibold text-lg md:text-xl hover:text-red-800 transition-colors"
            >
              Need to delete the Student mark?
            </button>
          ) : (
            <form onSubmit={handleDelete} className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="number"
                id="deleteRegisterNumber"
                placeholder="Enter Register Number to Delete"
                className="flex-1 px-4 py-3 border-2 border-teal-400 rounded-lg focus:outline-none focus:border-teal-600 text-lg shadow-sm hover:bg-red-50 transition-colors"
                required
              />
              <button
                type="submit"
                className="cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-bold shadow-md hover:shadow-lg"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteForm(false)}
                className="cursor-pointer px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all font-semibold shadow-md"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .animated-box {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          animation: moveUp 10s linear infinite;
        }

        @keyframes moveUp {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100vh);
          }
        }
      `}</style>
    </div>
  );
}