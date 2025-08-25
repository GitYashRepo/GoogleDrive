import { useDispatch, useSelector } from "react-redux"
import { uploadFile, fetchFiles } from "@/Redux/Slices/FileSlice"
import { logout } from "@/Redux/Slices/AuthSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Loader2,
    Upload,
    Grid3X3,
    List,
    Plus,
    Folder,
    FileText,
    ImageIcon,
    Video,
    Music,
    Archive,
    MoreVertical,
    Star,
    Share,
    Download,
    Cloud,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { files, loading } = useSelector((s) => s.file)
    const [selectedFile, setSelectedFile] = useState(null)
    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        dispatch(fetchFiles())
    }, [dispatch])

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            navigate("/user/login")
        } catch (err) {
            console.error("Logout failed:", err)
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if (selectedFile) {
            dispatch(uploadFile(selectedFile))
            setSelectedFile(null)
        }
    }

    const handleDownload = (file) => {
        const link = document.createElement("a")
        link.href = `${file.url}`
        link.download = file.originalname || file.name // suggest a filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleShare = (file) => {
        const shareUrl = `${file.url}`
        if (navigator.share) {
            navigator.share({
                title: file.originalname || file.name,
                text: "Check out this file",
                url: shareUrl,
            })
        } else {
            navigator.clipboard.writeText(shareUrl)
            alert("Link copied to clipboard!")
        }
    }

    const getFileIcon = (filename) => {
        const ext = filename?.split(".").pop()?.toLowerCase()
        switch (ext) {
            case "pdf":
            case "doc":
            case "docx":
            case "txt":
                return <FileText className="w-8 h-8 text-blue-600" />
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return <ImageIcon className="w-8 h-8 text-green-600" />
            case "mp4":
            case "avi":
            case "mov":
                return <Video className="w-8 h-8 text-red-600" />
            case "mp3":
            case "wav":
                return <Music className="w-8 h-8 text-purple-600" />
            case "zip":
            case "rar":
                return <Archive className="w-8 h-8 text-orange-600" />
            default:
                return <FileText className="w-8 h-8 text-gray-600" />
        }
    }

    return (
        <div className="h-screen flex flex-col bg-white">
            <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Folder className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-normal text-gray-700">Drive Clone</h1>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="ml-4 bg-transparent"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4">
                        <Button
                            className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 shadow-md"
                            onClick={() => document.getElementById("file-upload")?.click()}
                        >
                            <Plus className="w-5 h-5 mr-3" />
                            New
                        </Button>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </div>

                    <nav className="flex-1 px-2">
                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
                                <Folder className="w-5 h-5 mr-3" />
                                My Drive
                            </Button>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-medium text-gray-900">My Drive</h2>
                            {selectedFile && (
                                <Button onClick={handleUpload} disabled={loading} size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                                    Upload
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* File Content */}
                    <div className="flex-1 overflow-auto p-6">
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                                {files.map((file, index) => (
                                    <div key={index} className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className="relative">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute -top-2 left-10 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md hover:bg-gray-100"
                                                        >
                                                            <MoreVertical className="w-3 h-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleShare(file)}>
                                                            <Share className="w-4 h-4 mr-2" />
                                                            Share
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Download
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="text-center">
                                                {file.url && (/\.(jpg|jpeg|png|gif)$/i.test(file.name || file.originalname)) ? (
                                                    <img
                                                        src={file.url}
                                                        className="w-20 h-20 object-contain mx-auto"
                                                        alt={file.name}
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 flex items-center justify-center">
                                                        {getFileIcon(file.originalname || file.name)}
                                                    </div>
                                                )}

                                                {file.url && (
                                                    <a
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-xs text-blue-600 hover:underline mt-1 block truncate w-20"
                                                    >
                                                        {file.originalname || file.name}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                                    >
                                        {getFileIcon(file.originalname || file.name)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{file.originalname || file.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {file.url && (
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    Open
                                                </a>
                                            )}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="w-8 h-8">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleShare(file)}>
                                                        <Share className="w-4 h-4 mr-2" />
                                                        Share
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDownload(file)}>
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {files.length === 0 && !loading && (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <Cloud className="w-16 h-16 mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium mb-2">Your Drive is empty</h3>
                                <p className="text-sm text-center mb-4">Upload files to get started</p>
                                <Button
                                    onClick={() => document.getElementById("file-upload")?.click()}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Upload files
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home
