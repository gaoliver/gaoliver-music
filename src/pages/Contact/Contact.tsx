import ContactForm from '../../components/molecules/ContactForm';
import { PageContentSurface, PageSection, PageTitle } from '../../components/design-system';
import { contactContent } from '../../data';
import MainLayout from '../../templates/MainLayout';

export default function ContactPage() {
  return (
    <MainLayout>
      <PageTitle>{contactContent.title}</PageTitle>
      <PageContentSurface aria-label="Contact G.A. Oliver">
        <PageSection title="Send a message">
          <p className="mb-8 max-w-2xl text-[var(--shell-muted-light)]">
            {contactContent.description}
          </p>
          <div className="max-w-3xl">
            <ContactForm
              endpoint={contactContent.form.endpoint}
              placeholders={contactContent.form.fields}
              submitText={contactContent.form.submitText}
              messages={contactContent.form.messages}
            />
          </div>
        </PageSection>
      </PageContentSurface>
    </MainLayout>
  );
}
