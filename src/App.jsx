import React, { useState } from 'react';
import { Search, Filter, Save, X, ChevronDown, Download, ArrowRight, Info, Eye } from 'lucide-react';

const PASRRDashboard = () => {
  // Sample data for the dashboard
  const initialData = [
    {
      id: 1,
      selected: false,
      resident: "Test, John A",
      facility: "Oakridge Care Center",
      documentType: "",
      payorOnAdmission: "Medicare",
      effDate: "5/14/2025",
      submitDate: "",
      status: "",
      levelII: "",
      rrDueDate: "",
      dcOrderCompliant: null
    },
    {
      id: 2,
      selected: false,
      resident: "Sample, Mary E",
      facility: "Maple Grove Nursing & Rehabilitation",
      documentType: "",
      payorOnAdmission: "Medicaid",
      effDate: "5/14/2025",
      submitDate: "",
      status: "",
      levelII: "",
      rrDueDate: "",
      dcOrderCompliant: null
    },
    {
      id: 3,
      selected: false,
      resident: "Tester, Robert A",
      facility: "Riverside Health & Rehabilitation",
      documentType: "",
      payorOnAdmission: "Blue Cross Blue Shield",
      effDate: "5/14/2025",
      submitDate: "",
      status: "",
      levelII: "",
      rrDueDate: "",
      dcOrderCompliant: null
    },
    {
      id: 4,
      selected: false,
      resident: "Demo, Jane H",
      facility: "Sunset Senior Living",
      documentType: "",
      payorOnAdmission: "Aetna Commercial (BC1B) (LHS10)",
      effDate: "5/14/2025",
      submitDate: "",
      status: "",
      levelII: "",
      rrDueDate: "",
      dcOrderCompliant: null
    },
    {
      id: 5,
      selected: false,
      resident: "Example, Sarah L",
      facility: "Fairview Medical Center",
      documentType: "7000",
      payorOnAdmission: "United Health Care-Mcr Adv",
      effDate: "5/13/2025",
      submitDate: "5/13/2025",
      status: "COMPLETE",
      levelII: "",
      rrDueDate: "13 days remaining",
      dcOrderCompliant: true
    },
    {
      id: 6,
      selected: false,
      resident: "User, Test A",
      facility: "Pinecrest Rehabilitation Center",
      documentType: "7000",
      payorOnAdmission: "Hospice Medicaid",
      effDate: "5/13/2025",
      submitDate: "5/13/2025",
      status: "COMPLETE",
      levelII: "",
      rrDueDate: "13 days remaining",
      dcOrderCompliant: false
    }
  ];

  // Available forms for selection
  const availableForms = [
    {
      id: 'pas-1',
      type: 'PAS',
      label: 'PAS form submitted on 6/4/2025 (COMPLETE)',
      submitDate: '6/4/2025',
      status: 'COMPLETE'
    },
    {
      id: '7000-1',
      type: '7000',
      label: '7000 form submitted on 6/3/2025 (COMPLETE)',
      submitDate: '6/3/2025',
      status: 'COMPLETE',
      dcOrderCompliant: true
    },
    {
      id: '7000-2',
      type: '7000',
      label: '7000 form submitted on 6/1/2025 (COMPLETE)',
      submitDate: '6/1/2025',
      status: 'COMPLETE',
      dcOrderCompliant: false
    },
    {
      id: 'pas-2',
      type: 'PAS',
      label: 'PAS form submitted on 6/2/2025 (PENDING)',
      submitDate: '6/2/2025',
      status: 'PENDING'
    }
  ];

  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [activeTab, setActiveTab] = useState('select');
  const [selectedFormId, setSelectedFormId] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFormViewer, setShowFormViewer] = useState(false);
  const [viewingFormType, setViewingFormType] = useState('');
  const [showAIScanModal, setShowAIScanModal] = useState(false);
  const [selectedResidentForScan, setSelectedResidentForScan] = useState(null);
  const [aiScanActiveTab, setAiScanActiveTab] = useState('scan');

  // Handle ESC key to close modals
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowFormViewer(false);
        setShowModal(false);
        setShowAIScanModal(false);
        setViewingFormType('');
      }
    };
    document.addEventListener('keydown', handleEsc, false);
    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  // Function to handle opening the form selection modal
  const handleFormSelection = (id) => {
    setSelectedRowId(id);
    setShowModal(true);
    setSelectedFormId('');
    setActiveTab('select');
  };

  // Function to handle document type toggling (for existing selected forms)
  const handleDocTypeToggle = (id) => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          // Cycle through document types: "" -> "7000" -> "PAS" -> ""
          let newDocType, newDcOrderCompliant = null;
          if (!item.documentType) {
            newDocType = "7000";
            // Randomly assign AI Scan compliance for demo
            newDcOrderCompliant = Math.random() > 0.5 ? true : false;
          } else if (item.documentType === "7000") {
            newDocType = "PAS";
            newDcOrderCompliant = null; // PAS forms don't have AI Scan compliance
          } else {
            newDocType = "";
            newDcOrderCompliant = null;
          }

          return {
            ...item,
            documentType: newDocType,
            submitDate: newDocType ? "5/13/2025" : "",
            status: newDocType ? "COMPLETE" : "",
            dcOrderCompliant: newDcOrderCompliant
          };
        }
        return item;
      })
    );
  };

  // Function to close form viewer
  const closeFormViewer = () => {
    setShowFormViewer(false);
    setViewingFormType('');
  };

  // Function to open AI scan modal
  const handleAIScanClick = (resident) => {
    setSelectedResidentForScan(resident);
    setShowAIScanModal(true);
    setAiScanActiveTab('scan');
  };

  // Function to close AI scan modal
  const closeAIScanModal = () => {
    setShowAIScanModal(false);
    setSelectedResidentForScan(null);
    setAiScanActiveTab('scan');
  };

  // Function to view form (show actual form)
  const handleViewForm = (formId) => {
    const selectedForm = availableForms.find(f => f.id === formId);
    if (selectedForm) {
      setViewingFormType(selectedForm.type);
      setShowFormViewer(true);
    }
  };

  // Function to save selected form
  const handleSaveForm = () => {
    if (!selectedFormId) return;

    const selectedForm = availableForms.find(form => form.id === selectedFormId);
    if (!selectedForm) return;

    setData(prevData =>
      prevData.map(item => {
        if (item.id === selectedRowId) {
          return {
            ...item,
            documentType: selectedForm.type,
            submitDate: selectedForm.submitDate,
            status: selectedForm.status,
            dcOrderCompliant: selectedForm.dcOrderCompliant || null
          };
        }
        return item;
      })
    );

    setShowModal(false);
    setSelectedRowId(null);
    setSelectedFormId('');
  };

  // Function to get PASRR compliance display
  const getPASRRCompliance = (item) => {
    if (!item.documentType) {
      return {
        text: "Awaiting Form Association",
        color: "bg-amber-50 text-amber-700 border border-amber-200"
      };
    } else if (item.documentType === "PAS") {
      return {
        text: "Compliant",
        color: "bg-green-200 text-green-800 border border-green-300"
      };
    } else if (item.documentType === "7000") {
      return {
        text: "Not Compliant",
        color: "bg-red-200 text-red-800 border border-red-300"
      };
    } else {
      return {
        text: "Not Compliant",
        color: "bg-red-200 text-red-800 border border-red-300"
      };
    }
  };

  // Function to get 7000/PAS compliance display
  const get7000PASCompliance = (item) => {
    if (!item.documentType) {
      return {
        text: "",
        color: ""
      };
    } else if (item.documentType === "7000" || item.documentType === "PAS") {
      return {
        text: "Compliant",
        color: "bg-green-200 text-green-800 border border-green-300"
      };
    } else {
      return {
        text: "No PAS/7000 Present",
        color: "bg-red-200 text-red-800 border border-red-300"
      };
    }
  };

  // Function to get AI Scan compliance display
  const getAIScanCompliance = (item) => {
    if (item.documentType !== "7000") {
      return {
        text: "",
        color: ""
      };
    }

    if (item.dcOrderCompliant === true) {
      return {
        text: "Compliant",
        color: "bg-green-200 text-green-800 border border-green-300"
      };
    } else if (item.dcOrderCompliant === false) {
      return {
        text: "Review DC Order",
        color: "bg-red-200 text-red-800 border border-red-300"
      };
    } else {
      return {
        text: "Pending Review",
        color: "bg-yellow-200 text-yellow-800 border border-yellow-300"
      };
    }
  };

  // Function to get RR compliance display
  const getRRCompliance = (item) => {
    if (item.documentType === "7000") {
      return {
        text: "RR Pending",
        color: "bg-orange-200 text-orange-800 border border-orange-300"
      };
    } else {
      return {
        text: "",
        color: ""
      };
    }
  };

  // Function to handle resident selection
  const handleSelect = (id) => {
    setData(data.map(item =>
      item.id === id ? {...item, selected: !item.selected} : item
    ));
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="font-bold text-lg text-gray-800">CORECARE</div>
          <button className="px-2 py-1 border border-gray-300 rounded flex items-center">
            Menu <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Resident Search"
              className="pl-9 pr-4 py-1 border border-gray-300 rounded-md"
            />
            <Search size={16} className="absolute left-3 top-2 text-gray-400" />
          </div>
          <div>Hello, CoreCare</div>
        </div>
      </div>

      {/* Dashboard Title */}
      <div className="bg-white px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">PASRR Dashboard v2</h1>
          <div className="text-sm text-gray-500">(1,900 residents)</div>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center">
          <Download size={16} className="mr-2" /> Export
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-100 border-y border-gray-200 px-4 py-2 flex space-x-2">
        <button className="bg-white border border-gray-300 rounded px-3 py-1 flex items-center">
          <Filter size={16} className="mr-1" /> Filters
        </button>
        <button className="bg-white border border-gray-300 rounded px-3 py-1 flex items-center">
          <Save size={16} className="mr-1" /> Saved Filters
        </button>
        <button className="bg-white border border-gray-300 rounded px-3 py-1 flex items-center">
          Quick Views
        </button>
      </div>

      {/* Applied Filters */}
      <div className="bg-white px-4 py-2 flex space-x-2 items-center border-b border-gray-200">
        <button className="bg-gray-100 border border-gray-300 rounded flex items-center px-2 py-1 text-sm">
          <X size={14} className="mr-1" /> Reset
        </button>
        <div className="bg-blue-100 border border-blue-300 rounded flex items-center px-2 py-1 text-sm text-blue-800">
          Eff. Date <X size={14} className="ml-1" />
        </div>
        <div className="bg-blue-100 border border-blue-300 rounded flex items-center px-2 py-1 text-sm text-blue-800">
          Resident <X size={14} className="ml-1" />
        </div>
        <button className="text-blue-600 flex items-center text-sm">
          <ArrowRight size={14} className="mr-1" /> Save Filters
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Resident <X size={12} className="ml-1" />
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Facility
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  PASRR Compliance
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  7000/PAS Compliance
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  AI Scan Compliance
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  RR Compliance
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Payor on Admission
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Eff. Date
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Document Type
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Submit Date
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Status
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  RR Due Date
                  <Filter size={12} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={item.selected}
                    onChange={() => handleSelect(item.id)}
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.resident}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.facility}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs rounded ${getPASRRCompliance(item).color}`}>
                    {getPASRRCompliance(item).text}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {get7000PASCompliance(item).text && (
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${get7000PASCompliance(item).color}`}>
                      {get7000PASCompliance(item).text}
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {getAIScanCompliance(item).text && (
                    <button
                      onClick={() => handleAIScanClick(item)}
                      className={`inline-flex px-2 py-1 text-xs rounded hover:opacity-80 transition-opacity cursor-pointer ${getAIScanCompliance(item).color}`}
                    >
                      {getAIScanCompliance(item).text}
                    </button>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {getRRCompliance(item).text && (
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${getRRCompliance(item).color}`}>
                      {getRRCompliance(item).text}
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.payorOnAdmission}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.effDate}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm">
                  {!item.documentType ? (
                    <button
                      onClick={() => handleFormSelection(item.id)}
                      className="flex items-center text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1"
                    >
                      <Download size={14} className="mr-1" /> Select a Form
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDocTypeToggle(item.id)}
                      className="px-2 py-1 text-xs rounded bg-purple-200 text-purple-800 border border-purple-300"
                    >
                      {item.documentType}
                    </button>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.submitDate}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.status}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.rrDueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Scan Modal */}
      {showAIScanModal && selectedResidentForScan && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={closeAIScanModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {selectedResidentForScan.resident.split(',')[0].charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedResidentForScan.resident}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-600 cursor-pointer hover:underline">View Resident Profile</span>
                  </p>
                </div>
              </div>
              <button
                onClick={closeAIScanModal}
                className="rounded-full p-2 hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-white">
              <button
                onClick={() => setAiScanActiveTab('alerts')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  aiScanActiveTab === 'alerts'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">🔔</span> Alerts
              </button>
              <button
                onClick={() => setAiScanActiveTab('comments')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  aiScanActiveTab === 'comments'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">💬</span> Comments
              </button>
              <button
                onClick={() => setAiScanActiveTab('scan')}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  aiScanActiveTab === 'scan'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">🔍</span> AI Scan
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {aiScanActiveTab === 'alerts' && (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2">🔔</div>
                  <p className="text-gray-600">No alerts for this resident</p>
                </div>
              )}

              {aiScanActiveTab === 'comments' && (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2">💬</div>
                  <p className="text-gray-600">No comments yet</p>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm">
                    Add a comment
                  </button>
                </div>
              )}

              {aiScanActiveTab === 'scan' && (
                <div className="space-y-4">
                  {/* Risk Score */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    selectedResidentForScan.dcOrderCompliant
                      ? 'bg-green-50 border-green-400'
                      : 'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedResidentForScan.dcOrderCompliant
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {selectedResidentForScan.dcOrderCompliant ? '✓' : '!'}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          selectedResidentForScan.dcOrderCompliant
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}>
                          {selectedResidentForScan.dcOrderCompliant ? 'Low Risk Score' : 'High Risk Score'}
                        </h4>
                        <p className={`text-sm ${
                          selectedResidentForScan.dcOrderCompliant
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}>
                          {selectedResidentForScan.dcOrderCompliant
                            ? 'All compliance requirements have been verified'
                            : 'Some compliance requirements need attention'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scan Timestamp */}
                  <p className="text-sm text-gray-600">
                    Scan completed: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>

                  {/* Verified Requirements */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">
                      Verified Requirements ({selectedResidentForScan.dcOrderCompliant ? '3' : '2'})
                    </h5>

                    <div className="space-y-3">
                      {/* Discharge Order Present */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                                Verified
                              </span>
                              <h6 className="font-medium text-gray-900">Discharge Order Present</h6>
                            </div>
                            <p className="text-sm text-blue-600 mb-2">📄 Page 5 of 28</p>
                            <p className="text-sm text-gray-600">
                              Complete discharge order form 7000-B verified and properly filled out.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                            <Eye size={12} className="mr-1" /> View Page
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">
                            Mark as reviewed
                          </button>
                        </div>
                      </div>

                      {/* Physician Signature Present */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                                Verified
                              </span>
                              <h6 className="font-medium text-gray-900">Physician Signature Present</h6>
                            </div>
                            <p className="text-sm text-blue-600 mb-2">📄 Page 6 of 28</p>
                            <p className="text-sm text-gray-600">
                              Physician signature verified in section 4B of the discharge order form.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                            <Eye size={12} className="mr-1" /> View Page
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">
                            Mark as reviewed
                          </button>
                        </div>
                      </div>

                      {/* Signed Physician Date */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 ${
                                selectedResidentForScan.dcOrderCompliant
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {selectedResidentForScan.dcOrderCompliant ? 'Verified' : 'Failed'}
                              </span>
                              <h6 className="font-medium text-gray-900">Signed Physician Date On/Before Admission Date</h6>
                            </div>
                            <p className="text-sm text-blue-600 mb-2">📄 Pages 1, 5 of 28</p>
                            <p className="text-sm text-gray-600">
                              {selectedResidentForScan.dcOrderCompliant
                                ? 'Physician signature date (4/29/2025) verified to be on/before resident admission date (5/2/2025).'
                                : 'Physician signature date (5/15/2025) is AFTER resident admission date (5/13/2025). This violates compliance requirements.'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                            <Eye size={12} className="mr-1" /> View Pages
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-xs">
                            Mark as reviewed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Was this scan helpful?
                  <div className="inline-flex ml-3 space-x-2">
                    <button className="text-lg hover:scale-110 transition-transform">👍</button>
                    <button className="text-lg hover:scale-110 transition-transform">👎</button>
                  </div>
                </div>
                <button
                  onClick={closeAIScanModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('select')}
                  className={`pb-2 ${activeTab === 'select'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'}`}
                >
                  Select a form
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2 ${activeTab === 'upload'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'}`}
                >
                  Upload a form
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {activeTab === 'select' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Select a form</h3>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="w-full p-3 border border-gray-300 rounded-md text-left flex justify-between items-center bg-white"
                    >
                      {selectedFormId
                        ? availableForms.find(f => f.id === selectedFormId)?.label
                        : "Select a form"
                      }
                      <ChevronDown size={20} />
                    </button>

                    {showDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {availableForms.map((form) => (
                          <div
                            key={form.id}
                            className={`p-3 border-b border-gray-100 last:border-b-0 ${
                              selectedFormId === form.id ? 'bg-blue-100' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <button
                                onClick={() => {
                                  setSelectedFormId(form.id);
                                  setShowDropdown(false);
                                }}
                                className="text-left flex-1"
                              >
                                {selectedFormId === form.id && (
                                  <span className="text-blue-600 mr-2">✓</span>
                                )}
                                {form.label}
                              </button>
                              <button
                                onClick={() => handleViewForm(form.id)}
                                className="ml-2 px-3 py-1 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 flex items-center"
                                title="View Form"
                              >
                                <Eye size={16} className="mr-1" />
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'upload' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Upload a form</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="text-gray-500">
                      <Download size={48} className="mx-auto mb-4" />
                      <p>Drag and drop files here, or click to browse</p>
                      <p className="text-sm mt-2">Supported formats: PDF, DOC, DOCX</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-start space-x-3 p-6 border-t">
              <button
                onClick={handleSaveForm}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                disabled={!selectedFormId && activeTab === 'select'}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Viewer Modal - Browser-like Design */}
      {showFormViewer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
          onClick={closeFormViewer}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser-like Header */}
            <div className="bg-gray-100 border-b border-gray-300 rounded-t-lg">
              {/* Browser Controls */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  {/* Traffic Light Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={closeFormViewer}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      title="Close"
                    ></button>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  {/* Browser Navigation */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeFormViewer}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium shadow-sm"
                >
                  ✕ Close
                </button>
              </div>

              {/* Address Bar */}
              <div className="px-4 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-gray-700">
                        https://hens.ohio.gov/forms/{viewingFormType === '7000' ? 'odm-07000-hospital-exemption.pdf' : 'odm-03622-pasrr-identification.pdf'}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded hover:bg-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Document Title Bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {viewingFormType === '7000' ? 'ODM 07000 - Hospital Exemption from Preadmission Screening' : 'ODM 03622 - PASRR Identification Screen'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Ohio Department of Medicaid • {viewingFormType === '7000' ? 'Rev. 2/2021' : 'Rev. 3/2021'} • Status: Complete
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Print">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded hover:bg-gray-200 text-gray-600" title="Download">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
              {/* Paper-like Document Container */}
              <div className="bg-white shadow-lg rounded-sm p-8 max-w-4xl mx-auto min-h-full">
                <div className="font-serif text-sm leading-relaxed">
                  <div className="text-center border-b pb-4">
                    <div className="text-xs text-gray-600 mb-2">
                      {viewingFormType === '7000' ? 'ODM 07000 (Rev. 2/2021)' : 'ODM 03622 (Rev. 3/2021)'} Page 1 of 2
                    </div>
                    <div className="font-bold text-lg">OHIO DEPARTMENT OF MEDICAID</div>
                    <div className="font-bold text-base mt-1">
                      {viewingFormType === '7000'
                        ? 'HOSPITAL EXEMPTION FROM PREADMISSION SCREENING NOTIFICATION'
                        : 'PREADMISSION SCREENING AND RESIDENT REVIEW (PASRR) IDENTIFICATION SCREEN'
                      }
                    </div>
                  </div>
                  <div className="mt-6 text-center text-gray-600">
                    <p>This is a preview of the official {viewingFormType === '7000' ? 'Hospital Exemption' : 'PASRR'} form.</p>
                    <p className="mt-2">The complete form contains all required fields and certification sections.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser-like Footer */}
            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure Connection</span>
                  </div>
                  <div>Form Status: Complete</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-600">
                    Press ESC to close
                  </div>
                  <button
                    onClick={closeFormViewer}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium shadow-sm"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instruction Panel */}
      <div className="bg-blue-50 p-4 border-t border-blue-200">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mr-2 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900">PASRR Compliance Status Updates</h3>
            <p className="text-blue-800 text-sm mt-1">
              The following compliance status changes are implemented:
            </p>
            <ul className="text-blue-800 text-sm mt-2 list-disc pl-5">
              <li><strong>PASRR Compliance</strong> - When no form is selected, the status shows as "Awaiting Form Association" with a yellow background</li>
              <li><strong>7000/PAS Compliance</strong> - When no form is selected, this status is blank</li>
              <li><strong>AI Scan Compliance</strong> - Only appears for 7000 forms. Click to open detailed validation results with page-by-page verification</li>
              <li><strong>Interactive AI Scan</strong> - Shows risk scores, verified requirements, and allows page-level review of compliance issues</li>
              <li><strong>Document Type Toggle</strong> - Clicking cycles through these options:</li>
              <ul className="ml-4 mt-1">
                <li><strong>Select a Form</strong>: PASRR = "Awaiting Form Association" (Yellow), 7000/PAS = blank, AI Scan = blank, RR = blank</li>
                <li><strong>7000</strong>: PASRR = "Not Compliant" (Red), 7000/PAS = "Compliant" (Green), AI Scan = clickable status, RR = "RR Pending" (Orange)</li>
                <li><strong>PAS</strong>: PASRR = "Compliant" (Green), 7000/PAS = "Compliant" (Green), AI Scan = blank, RR = blank</li>
              </ul>
            </ul>
            <p className="text-blue-800 text-sm mt-2">
              <strong>Try it:</strong> Click "Select a Form" to open the modal, choose from the dropdown, click "View" button to see the actual forms with sample data, and <strong>click any AI Scan compliance status</strong> to see detailed validation results with interactive verification features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PASRRDashboard;
