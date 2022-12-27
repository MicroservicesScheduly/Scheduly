﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TokenService.DbAccess;

#nullable disable

namespace TokenService.Migrations
{
    [DbContext(typeof(UserDbContext))]
    partial class UserDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TokenService.Entities.Credentials", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<int?>("RoleId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Credentials", (string)null);
                });

            modelBuilder.Entity("TokenService.Entities.EI", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Link")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("EIs");
                });

            modelBuilder.Entity("TokenService.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoleName = "user"
                        });
                });

            modelBuilder.Entity("TokenService.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CredentialsId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<DateTime>("RegistrationTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("TokenService.Entities.UserEI", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EIId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsAnswered")
                        .HasColumnType("boolean");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("userEmailWhoSendInvite")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("EIId");

                    b.HasIndex("UserId");

                    b.ToTable("UserEIs");
                });

            modelBuilder.Entity("TokenService.Entities.Credentials", b =>
                {
                    b.HasOne("TokenService.Entities.Role", "Role")
                        .WithMany("Credentials")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("TokenService.Entities.User", "User")
                        .WithOne("Credentials")
                        .HasForeignKey("TokenService.Entities.Credentials", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TokenService.Entities.UserEI", b =>
                {
                    b.HasOne("TokenService.Entities.EI", "EI")
                        .WithMany("UserEIs")
                        .HasForeignKey("EIId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TokenService.Entities.User", "User")
                        .WithMany("UserEIs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EI");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TokenService.Entities.EI", b =>
                {
                    b.Navigation("UserEIs");
                });

            modelBuilder.Entity("TokenService.Entities.Role", b =>
                {
                    b.Navigation("Credentials");
                });

            modelBuilder.Entity("TokenService.Entities.User", b =>
                {
                    b.Navigation("Credentials")
                        .IsRequired();

                    b.Navigation("UserEIs");
                });
#pragma warning restore 612, 618
        }
    }
}
