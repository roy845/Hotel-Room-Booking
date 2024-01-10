FROM openjdk:17
COPY target/lakeSide-hotel-0.0.1-SNAPSHOT.jar /usr/src/lakeSide-hotel-0.0.1-SNAPSHOT.jar
COPY src/main/resources/application.properties /opt/conf/application.properties
CMD ["java", "-jar", "/usr/src/lakeSide-hotel-0.0.1-SNAPSHOT.jar", "--spring.config.location=file:/opt/conf/application.properties"]
