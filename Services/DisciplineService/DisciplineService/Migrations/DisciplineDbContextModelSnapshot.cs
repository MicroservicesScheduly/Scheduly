﻿// <auto-generated />
using System;
using DisciplineService.DbAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DisciplineService.Migrations
{
    [DbContext(typeof(DisciplineDbContext))]
    partial class DisciplineDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DisciplineService.Entities.Catalog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<int?>("UniversityId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Catalogs");
                });

            modelBuilder.Entity("DisciplineService.Entities.CatalogDiscipline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CatalogId")
                        .HasColumnType("integer");

                    b.Property<int>("DisciplineId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CatalogId");

                    b.HasIndex("DisciplineId");

                    b.ToTable("CatalogDisciplines");
                });

            modelBuilder.Entity("DisciplineService.Entities.Discipline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CatalogId")
                        .HasColumnType("integer");

                    b.Property<int>("Course")
                        .HasColumnType("integer");

                    b.Property<int>("CreditType")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<int>("Hours")
                        .HasColumnType("integer");

                    b.Property<bool>("IsSelective")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int?>("UniversityId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Disciplines");
                });

            modelBuilder.Entity("DisciplineService.Entities.SpecialtyDiscipline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DisciplineId")
                        .HasColumnType("integer");

                    b.Property<int>("Semester")
                        .HasColumnType("integer");

                    b.Property<int>("SpecialtyId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DisciplineId");

                    b.ToTable("SpecialtyDisciplines");
                });

            modelBuilder.Entity("DisciplineService.Entities.CatalogDiscipline", b =>
                {
                    b.HasOne("DisciplineService.Entities.Catalog", "Catalog")
                        .WithMany("CatalogDisciplines")
                        .HasForeignKey("CatalogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DisciplineService.Entities.Discipline", "Discipline")
                        .WithMany("CatalogDisciplines")
                        .HasForeignKey("DisciplineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Catalog");

                    b.Navigation("Discipline");
                });

            modelBuilder.Entity("DisciplineService.Entities.SpecialtyDiscipline", b =>
                {
                    b.HasOne("DisciplineService.Entities.Discipline", "Discipline")
                        .WithMany("SpecialtyDisciplines")
                        .HasForeignKey("DisciplineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Discipline");
                });

            modelBuilder.Entity("DisciplineService.Entities.Catalog", b =>
                {
                    b.Navigation("CatalogDisciplines");
                });

            modelBuilder.Entity("DisciplineService.Entities.Discipline", b =>
                {
                    b.Navigation("CatalogDisciplines");

                    b.Navigation("SpecialtyDisciplines");
                });
#pragma warning restore 612, 618
        }
    }
}
