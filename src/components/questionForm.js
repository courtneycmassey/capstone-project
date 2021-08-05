import React from 'react';

const QuestionForm = () => {
    return (
        <form>
            <h2>Ask a Question</h2>
            <div>
                <label>Question:</label>
                <input type="text" />
            </div>
            <button>Submit Question</button>
        </form>
    );
};

export default QuestionForm;