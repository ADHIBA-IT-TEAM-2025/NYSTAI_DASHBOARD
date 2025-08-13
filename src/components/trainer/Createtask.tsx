import PageMeta from "../common/PageMeta.tsx";
import PageBreadcrumb from "../common/PageBreadCrumb.tsx";

export default function Createtask() {

  


    return (
        <>

            <PageMeta
                title="Nystai Institute | CCTV & Home Automation Course Training"
                description="Join Nystai Institute to master CCTV installation and home automation systems. Get hands-on training, expert guidance, and industry-ready skills for a successful tech career."
            />
            <PageBreadcrumb
                pageTitle="All Trainers"
                pageTitleLink="/Trainers"
                pageTitle1="Create Assignment"
            />

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6" >
                    <div className="space-y-6" >

                        {/* Heading design */}
                        <h2
                            className="text-xl font-semibold text-gray-800 dark:text-white/90"
                            x-text="pageName"
                        >
                            Assigned Task List
                        </h2>

                        {/* input form  */}

                        <h3 className="text-l font-semibold text-[#202224] dark:text-white/90 py-4">
                            Create Assignment
                        </h3>
                        {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 grid-rows-1">
                            <div className="left-div">
                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mb-5">
                                    <div className="space-y-6">
                                        <div>
                                            <Label>Assignment Title</Label>
                                            <div className="relative">
                                                <Input
                                                    placeholder="System Integration: Module 1"
                                                    type="text"
                                                    className={`${errors.name ? 'border border-red-500 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-transparent dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800' : ''}`}
                                                    value={formData.name}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const onlyLetters = value.replace(/[^A-Za-z]/g, ''); // removes special chars
                                                        setFormData({ ...formData, name: onlyLetters });
                                                    }}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <Label>Assign To Batch</Label>
                                            <div className="relative">
                                                <Input
                                                    placeholder="Batch 2"
                                                    type="text"
                                                    className={`${errors.last_name ? 'border border-red-500' : ''}`}
                                                    value={formData.last_name}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const onlyLetters = value.replace(/[^A-Za-z]/g, ''); // allows only A-Z, a-z
                                                        setFormData({ ...formData, last_name: onlyLetters });
                                                    }}
                                                />
                                                {errors.last_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                    <div className="space-y-6">
                                        <div>
                                            <Label>Course</Label>
                                            <div className="relative">
                                                <CustomDropdown
                                                    options={["Male", "Female", "Other"]}
                                                    value={formData.gender} //  controlled value
                                                    onSelect={(value) => setFormData({ ...formData, gender: value })}
                                                />
                                                {errors.gender && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <Label>Deadline</Label>
                                            <DatePicker
                                                id="dob"
                                                placeholder="Select Joining Date"
                                                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 21))}
                                                value={formData.dob ? new Date(formData.dob) : undefined}
                                                onChange={(date) => {
                                                    const selectedDate = Array.isArray(date) ? date[0] : date;
                                                    setFormData({
                                                        ...formData,
                                                        dob: selectedDate
                                                            ? selectedDate.toISOString().split("T")[0]
                                                            : "",
                                                    });
                                                }}
                                            />
                                            {errors.dob && (
                                                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" grid-rows-2">

                                <div className="right-div row-span-2">
                                    <Label>Assignment Title</Label>
                                    <div className="relative h-full">
                                        <textarea
                                            placeholder="System Integration: Module 1"
                                            className={`w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-[#8897AD] focus:outline-hidden focus:ring-1 focus:bg-[@fff] bg-[#f5f5f5] dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  overflow-y-auto resize-none`}
                                            style={{ height: '132px' }} // fixed height
                                            value={formData.name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const onlyLetters = value.replace(/[^A-Za-z]/g, '');
                                                setFormData({ ...formData, name: onlyLetters });
                                            }}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}

                                    </div>
                                </div>
                            </div>

                        </div> */}

                        {/* BTN  */}


                    </div>
                    <div className="grid xl:grid-cols-2 gap-6 mt-12">
                        <div className="col-span-full flex justify-center">
                            <button
                                className="flex items-center justify-center px-15 py-3 font-medium text-dark rounded-lg bg-[#F8C723] text-theme-sm hover:bg-brand-600"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

// DROPDOWN COMPONENT
// type CustomDropdownProps<T extends string> = {
//     label?: string;
//     options: T[];
//     value: T; // controlled selected value
//     onSelect?: (value: T) => void;
//     classsName?: string;
// };

// function CustomDropdown<T extends string>({
//     label = "Pick an option",
//     options = [],
//     value,
//     oSelect,
// }: CustomDropdownProps<T>) {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleSelect = (value: T) => {
//         setIsOpen(false);
//         onSelect?.(value);
//     };

//     return (
//         <div className="relative" ref={dropdownRef}>
//             <button
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 className="peer w-full appearance-none rounded-md border border-gray-300 bg-[#F5F5F5] px-4 pr-10 py-2.5 text-left text-gray-400
//         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
//             >
//                 {value || label}
//             </button>

//             {/* Dropdown Icon */}
//             <span
//                 className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
//                     }`}
//             >
//                 <FontAwesomeIcon icon={faChevronDown} />
//             </span>

//             {/* Dropdown List */}
//             {isOpen && (
//                 <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
//                     {options.map((option) => (
//                         <li
//                             key={option}
//                             onClick={() => handleSelect(option)}
//                             className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//                         >
//                             {option}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }


// function FileUploadBox({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles.length > 0) {
//             const file = acceptedFiles[0];
//             setSelectedFile(file);
//             onFileSelect(file); // Pass file to parent
//         }
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         multiple: false,
//     });

//     const handleDelete = () => {
//         setSelectedFile(null);
//         onFileSelect(null); // Clear in parent
//     };

//     // Render uploaded file preview card
//     if (selectedFile) {
//         const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);


//         return (
//             <div className="bg-white flex justify-between items-center px-4 py-3 rounded-xl shadow border h-[176px]">
//                 <div className="flex items-center gap-4">
//                     {/* File icon */}
//                     <div className="">
//                         <img
//                             src={Uploadafter}
//                             alt="Preview"
//                             className="h-12 w-12 object-contain"
//                         />
//                     </div>
//                     {/* File name and size */}
//                     <div>
//                         <p className="text-sm font-medium">{selectedFile.name}</p>
//                         <p className="text-xs text-gray-500">{fileSizeMB} MB</p>
//                     </div>
//                 </div>

//                 {/* Delete button */}
//                 <button
//                     onClick={handleDelete}
//                     className="text-gray-500 hover:text-red-500 transition"
//                 >
//                     <Trash2 size={18} />
//                 </button>
//             </div>
//         );
//     }

//     // Render upload dropzone
//     return (
//         <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 h-[176px]">
//             <form
//                 {...getRootProps()}
//                 className={`dropzone h-full rounded-xl border-dashed border-gray-300 p-7 lg:p-10
//       ${isDragActive
//                         ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
//                         : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"}
//     `}
//                 id="demo-upload"
//             >
//                 <input {...getInputProps()} />
//                 <div className="dz-message flex flex-row items-center m-0 gap-6 h-full">
//                     {/* Icon Container */}
//                     <div className="flex justify-center items-center shrink-0">
//                         <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full text-gray-700 dark:bg-gray-800 dark:text-gray-400">
//                             <img src={Upload} alt="Upload Icon" className="h-12 w-12 object-contain" />
//                         </div>
//                     </div>

//                     {/* Text Content */}
//                     <div className="max-w-[400px] text-center">
//                         <h4 className="mb-2 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
//                             {isDragActive ? "Drop Files or" : "Drag & Drop Files or"}{" "}
//                             <span className="font-medium underline text-theme-sm text-brand-500">
//                                 Browse File
//                             </span>
//                         </h4>
//                         <span className="block text-sm text-gray-700 dark:text-gray-400">
//                             Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
//                         </span>
//                     </div>
//                 </div>
//             </form>
//         </div>

//     );
// }