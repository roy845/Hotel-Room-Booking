package com.royatali.lakesidehotel.serializers;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

public class BlobSerializer extends JsonSerializer<Blob> {

    @Override
    public void serialize(Blob value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        // Convert the Blob to a byte array and serialize it as a base64-encoded string
        byte[] bytes = new byte[0];
        try {
            bytes = value.getBytes(1, (int) value.length());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        gen.writeBinary(bytes);
    }
}

