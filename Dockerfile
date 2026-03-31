# Step 1: Build the application using Maven and JDK 21
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# This compiles your code and creates the .war file
RUN mvn clean package -DskipTests

# Step 2: Create the runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the built .war file from the build stage to the runtime stage
COPY --from=build /app/target/*.war app.war

# Match the port in your application.properties
EXPOSE 1001

# Start the application
ENTRYPOINT ["java", "-jar", "app.war"]