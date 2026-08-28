import ContactForm from '../../components/molecules/ContactForm';
import { PageContentSurface, PageTitle, PageSection } from '../../components/design-system';
import SocialLinks from '../../components/molecules/SocialLinks';
import { contactContent, siteContent } from '../../data';
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
        <PageSection title="Elsewhere">
          {contactContent.email && (
            <p className="mb-6">
              <a
                href={`mailto:${contactContent.email}`}
                className="text-base uppercase text-[var(--shell-muted)] underline underline-offset-4 transition-colors hover:text-brand-accentHover"
              >
                {contactContent.email}
              </a>
            </p>
          )}
          <SocialLinks links={siteContent.socialLinks} withDividers={false} />
        </PageSection>
      </PageContentSurface>
    </MainLayout>
  );
}
