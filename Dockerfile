# Step 1: Build the application using Maven and JDK 21
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# This runs the build inside Render's cloud
RUN mvn clean package -DskipTests

# Step 2: Create the runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the built .war file from the build stage
COPY --from=build /app/target/*.war app.war

# Eureka Server default port
EXPOSE 8761

# Start the application
ENTRYPOINT ["java", "-jar", "app.war"]