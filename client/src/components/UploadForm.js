import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const UPLOAD_MUTATION = gql`
  mutation submit($file: Upload!) {
    submitAFile(file: $file) {
      filename
      mimetype
      filesize
    }
  }
`;

export default function UploadForm({ onComplete = f => f }) {
  const mutationComplete = (cache, { data }) =>
    onComplete({
      size: data.submitAFile.filesize,
      name: data.submitAFile.filename,
      type: data.submitAFile.mimetype
    });

  return (
    <form>
      <Mutation mutation={UPLOAD_MUTATION} update={mutationComplete}>
        {mutation => (
          <input
            type="file"
            onChange={e => {
              const [file] = e.target.files;
              mutation({
                variables: {
                  file
                }
              });
            }}
          />
        )}
      </Mutation>
    </form>
  );
}
