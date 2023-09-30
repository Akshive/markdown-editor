import {Form, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import "../css/App.css"
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import MarkdownIt from 'markdown-it';

function MarkdownEditor(){
    const [inputMarkdown, setInputMarkdown] = useState("");
    const [outputHtml, setOutputHtml] = useState("");

    const {colClass, setColClass} = useContext(ThemeContext);

    const topDown = (isChecked) => {
        return isChecked ? setColClass(`col-12`) : setColClass(`col-6`);
    }

    useEffect(() => {
        const md = new MarkdownIt();
        setOutputHtml(md.render(inputMarkdown));
    }, [inputMarkdown]);

    return (
        <div>
            <Form className="d-flex justify-content-end gap-2 mb-3">
                <label>top-down</label>
                <Form.Check type="switch" id="custom-switch" onClick={(e) => topDown(e.target.checked)}></Form.Check>
            </Form>
            <Row className={`mb-5`}>
                <Col className={`mb-4 ${colClass}`}>
                    <Badge className="text-white text-nowrap fw-bold">Enter Markdown</Badge>
                    <textarea value={inputMarkdown} onChange={(e) => setInputMarkdown(e.target.value)} className="markdown-editor form-control rounded-bottom "></textarea>
                </Col>
                <Col className={`mb-4 ${colClass}`}>
                    <Badge className="text-white text-nowrap fw-bold">Preview</Badge>
                    <div dangerouslySetInnerHTML={{ __html: outputHtml }} className="markdown-editor form-control rounded-bottom"></div>
                </Col>
            </Row>
        </div>
    );
}

export default MarkdownEditor;