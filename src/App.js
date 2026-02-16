import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminHome from "./pages/AdminHome";
import Years from "./pages/Years";
import PrivateRoute from "./utils/PrivateRoute";
import Deaneries from "./pages/Deaneries";
import Parishes from "./pages/Parishes";
import Registrations from "./pages/Registrations";
import ViewRegistrations from "./pages/ViewRegistrations";
import PublicFigures from "./pages/PublicFigures";
import PublicLayout from "./layouts/PublicLayout";
import PublicHome from "./pages/PublicHome";
import About from "./pages/About";
import News from "./pages/News";
import Posts from "./pages/admin/Posts";
import PostForm from "./pages/admin/PostForm";
import Documents from "./pages/admin/Documents";
import DocumentForm from "./pages/admin/DocumentForm";
import PublicDocuments from "./pages/PublicDocuments";
import Executives from "./pages/admin/Contacts/Executives";
import ExecutiveForm from "./pages/admin/Contacts/ExecutiveForm";
import OfficeContact from "./pages/admin/Contacts/OfficeContact";
import Contact from "./pages/Contact";
import MediaList from "./pages/admin/media/MediaList";
import MediaForm from "./pages/admin/media/MediaForm";
import Media from "./pages/Media";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/registration-figures" element={<PublicFigures />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/documents" element={<PublicDocuments />} />
          <Route path="/contact_us" element={<Contact />} />
          <Route path="/media" element={<Media />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="years" element={<Years />} />
          <Route path="deaneries" element={<Deaneries />} />
          <Route path="parishes" element={<Parishes />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="view-registrations" element={<ViewRegistrations />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="posts/edit/:id" element={<PostForm />} />
          <Route path="/admin/documents" element={<Documents />} />
          <Route path="/admin/documents/new" element={<DocumentForm />} />
          <Route path="/admin/contact/executives" element={<Executives />} />
          <Route path="/admin/contact/executives/new" element={<ExecutiveForm />} />
          <Route path="/admin/contact/executives/edit/:id" element={<ExecutiveForm />} />
          <Route path="/admin/contact/office" element={<OfficeContact />} />
          <Route path="/admin/media" element={<MediaList />} />
          <Route path="/admin/media/new" element={<MediaForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
